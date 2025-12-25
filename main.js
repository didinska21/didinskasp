// ========================================
// PART 1: Dependencies & Constants
// ========================================

const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cfonts = require('cfonts');
const UserAgent = require('user-agents');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const cbor = require('cbor');

// Color constants
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';
const BOLD = '\x1b[1m';

// Spinner animation frames
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// ========================================
// PART 1: Helper Functions
// ========================================

function createSpinner(message) {
  let frameIndex = 0;
  let interval = null;
  let isActive = false;

  function clearLine() {
    try {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    } catch (error) {
      // Ignore errors
    }
  }

  return {
    start() {
      if (isActive) return;
      isActive = true;
      clearLine();
      process.stdout.write(`${CYAN}${SPINNER_FRAMES[frameIndex]} ${message}${RESET}`);
      
      interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
        clearLine();
        process.stdout.write(`${CYAN}${SPINNER_FRAMES[frameIndex]} ${message}${RESET}`);
      }, 100);
    },

    succeed(successMessage) {
      if (!isActive) return;
      clearInterval(interval);
      isActive = false;
      clearLine();
      process.stdout.write(`${GREEN}${BOLD}✔ ${successMessage}${RESET}\n`);
    },

    fail(errorMessage) {
      if (!isActive) return;
      clearInterval(interval);
      isActive = false;
      clearLine();
      process.stdout.write(`${RED}✖ ${errorMessage}${RESET}\n`);
    },

    stop() {
      if (!isActive) return;
      clearInterval(interval);
      isActive = false;
      clearLine();
    }
  };
}

function centerText(text) {
  const terminalWidth = process.stdout.columns || 80;
  const textLength = text.replace(/\x1b\[[0-9;]*m/g, '').length;
  const padding = Math.max(0, Math.floor((terminalWidth - textLength) / 2));
  return ' '.repeat(padding) + text;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown(milliseconds, message = 'Tunggu') {
  const seconds = Math.floor(milliseconds / 1000);
  
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`${YELLOW}\r${message} ${i} detik...${RESET}`);
    await delay(1000);
  }
  
  process.stdout.write('\r' + ' '.repeat(50) + '\r');
}

// ========================================
// PART 2: Banner & Proxy Functions
// ========================================

// Display banner
cfonts.say('ALLSCALE', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'magenta']
});

console.log(centerText(BLUE + '☆ Telegram Channel: @airdropwithmeh ☆' + RESET));
console.log(centerText(CYAN + '☆ BOT AUTO REFERRAL ASP ☆' + RESET + '\n'));

// ========================================
// Proxy & File Functions
// ========================================

function readProxiesFromFile(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    return fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
  } catch (error) {
    console.log(RED + 'Gagal membaca file proxy.txt: ' + error.message + RESET);
    return [];
  }
}

// ========================================
// HTTP Headers Function
// ========================================

function getGlobalHeaders(url, referrer, additionalHeaders = {}) {
  const userAgent = new UserAgent();
  
  const headers = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'origin': 'https://dashboard.allscale.io',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://dashboard.allscale.io/' + referrer,
    'sec-ch-ua': '"Not?A_Brand";v="99", "Chromium";v="130"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': userAgent.toString()
  };

  // Add authentication headers if needed
  if (url.includes('/api/secure/')) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
      .createHash('sha256')
      .update('vT*IUEGgyL' + timestamp)
      .digest('hex');
    
    headers['x-timestamp'] = timestamp;
    headers['x-signature'] = signature;
  }

  return Object.assign(headers, additionalHeaders);
}

// ========================================
// Email Provider Constants
// ========================================

const providers = ['mail.tm', 'guerrillamail'];

// ========================================
// PART 3: Temporary Email Functions
// ========================================

async function getTempEmail(provider, axiosInstance, ipAddress, userAgent) {
  
  // Mail.tm provider
  if (provider === 'mail.tm') {
    try {
      let domains = [];
      let page = 1;

      // Fetch available domains
      while (true) {
        const url = 'https://api.mail.tm/domains?page=' + page;
        const response = await axios.get(url);

        if (response.status !== 200) {
          throw new Error('Failed to fetch domains');
        }

        const data = response.data;
        const domainList = data['hydra:member'] || [];
        const activeDomains = domainList.filter(d => d.isActive && !d.isPrivate);
        
        domains = domains.concat(activeDomains);

        if (!data['hydra:view'] || !data['hydra:view'].next) {
          break;
        }
        page++;
      }

      if (domains.length <= 0) {
        throw new Error('No domains available');
      }

      // Select random domain
      const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
      const domainName = selectedDomain.domain;
      
      // Generate random login
      const randomLogin = Math.random().toString(36).substring(2, 15);
      const emailAddress = randomLogin + '@' + domainName;
      const password = 'Password123!';
      const apiUrl = 'https://api.mail.tm/accounts';

      const payload = {
        address: emailAddress,
        password: password
      };

      const registerResponse = await axios.post(apiUrl, payload);

      if (registerResponse.status === 201) {
        console.log(GREEN + 'Email berhasil dibuat: ' + emailAddress + RESET);
        return {
          provider: 'mail.tm',
          address: emailAddress,
          password: password,
          login: randomLogin,
          domain: domainName
        };
      } else {
        throw new Error('Account creation failed');
      }

    } catch (error) {
      console.log(RED + 'Gagal membuat temp email: ' + error.message + RESET);
      return null;
    }
  }

  // Guerrillamail provider
  if (provider === 'guerrillamail') {
    const url = 'https://api.guerrillamail.com/ajax.php';
    const params = {
      f: 'get_email_address',
      lang: 'en',
      ip: ipAddress,
      agent: userAgent
    };

    try {
      const response = await axiosInstance.get(url, { params: params });
      const data = response.data;
      const emailAddress = data.email_addr;
      const sidToken = data.sid_token || '';
      let phpsessid = '';

      // Extract PHPSESSID from cookies
      if (response.headers['set-cookie']) {
        response.headers['set-cookie'].forEach(cookie => {
          if (cookie.includes('PHPSESSID')) {
            phpsessid = cookie.split(';')[0].split('=')[1];
          }
        });
      }

      console.log(GREEN + 'Email berhasil dibuat: ' + emailAddress + RESET);
      
      return {
        provider: 'guerrillamail',
        address: emailAddress,
        sid_token: sidToken,
        phpsessid: phpsessid
      };

    } catch (error) {
      console.log(RED + 'Failed to generate temp email : ' + error.message + RESET);
      return null;
    }
  }

  return null;
}

// ========================================
// Mail.tm Token Function
// ========================================

async function getMailTmToken(axiosInstance, emailAddress, password) {
  const url = 'https://api.mail.tm/token';
  const payload = {
    address: emailAddress,
    password: password
  };

  try {
    const response = await axios.post(url, payload);
    return response.data.token;
  } catch (error) {
    console.log(RED + 'Failed to get Mail.tm token: ' + error.message + RESET);
    return null;
  }
}

// ========================================
// PART 4: Inbox Checking Functions
// ========================================

async function checkInbox(provider, axiosInstance, emailData, maxAttempts = 15, delayMs = 2000) {
  
  // Check inbox for Mail.tm
  if (provider === 'mail.tm') {
    const token = await getMailTmToken(axiosInstance, emailData.address, emailData.password);
    
    if (!token) return null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const messagesUrl = 'https://api.mail.tm/messages';

      try {
        const response = await axios.get(messagesUrl, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        const messages = response.data['hydra:member'];

        if (messages.length > 0) {
          const messageId = messages[0].id;
          const messageUrl = 'https://api.mail.tm/messages/' + messageId;
          
          const messageResponse = await axios.get(messageUrl, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });

          const emailBody = messageResponse.data.text || messageResponse.data.html;
          const codeMatch = emailBody.match(/verification code is (\d{6})/);

          if (codeMatch) {
            return codeMatch[1]; // Return the 6-digit code
          }
        }

      } catch (error) {
        console.log(YELLOW + 'Cek inbox attempt ' + attempt + ': ' + error.message + RESET);
      }

      await delay(delayMs);
    }

    console.log(RED + 'Tidak ada email setelah ' + maxAttempts + ' percobaan' + RESET);
    return null;
  }

  // Check inbox for Guerrillamail
  if (provider === 'guerrillamail') {
    const sidToken = emailData.sid_token;
    const phpsessid = emailData.phpsessid;
    const cookieHeader = {
      'Cookie': 'PHPSESSID=' + phpsessid
    };

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const url = 'https://api.guerrillamail.com/ajax.php';
      const checkParams = {
        f: 'check_email',
        seq: 0
      };

      try {
        const checkResponse = await axiosInstance.get(url, {
          params: checkParams,
          headers: cookieHeader
        });

        const emailList = checkResponse.data.list || [];

        if (emailList.length > 0) {
          const firstEmail = emailList[0];
          const fetchParams = {
            f: 'fetch_email',
            email_id: firstEmail.mail_id
          };

          const fetchResponse = await axiosInstance.get(url, {
            params: fetchParams,
            headers: cookieHeader
          });

          const mailBody = fetchResponse.data.mail_body || '';
          const codeMatch = mailBody.match(/verification code is (\d{6})/);

          if (codeMatch) {
            return codeMatch[1]; // Return the 6-digit code
          }
        }

      } catch (error) {
        console.log(YELLOW + 'Cek inbox attempt ' + attempt + ': ' + error.message + RESET);
      }

      await delay(delayMs);
    }

    console.log(RED + 'Tidak ada email setelah ' + maxAttempts + ' percobaan' + RESET);
    return null;
  }

  return null;
}

// ========================================
// PART 5: Verification Functions
// ========================================

async function sendVerification(axiosInstance, emailAddress, authToken) {
  const url = 'https://dashboard.allscale.io/api/secure/misc/send/verification/mail';
  const payload = {
    email: emailAddress
  };

  const headers = {
    ...getGlobalHeaders(url, ''),
    'authorization': 'Bearer ' + authToken,
    'referer': 'https://dashboard.allscale.io/pay'
  };

  const spinner = createSpinner('Mengirim kode verifikasi...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, payload, {
      headers: headers
    });

    if (response.data.code === 0) {
      spinner.succeed('Kode verifikasi berhasil dikirim');
      return true;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }

  } catch (error) {
    const errorMsg = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    
    spinner.fail(' Failed to send verification: ' + errorMsg);
    return false;
  }
}

async function verifyEmail(axiosInstance, emailAddress, verificationCode, authToken) {
  const url = 'https://dashboard.allscale.io/api/secure/misc/verify/email';
  const payload = {
    email: emailAddress,
    code: verificationCode
  };

  const headers = {
    ...getGlobalHeaders(url, ''),
    'authorization': 'Bearer ' + authToken,
    'referer': 'https://dashboard.allscale.io/pay'
  };

  const spinner = createSpinner('Memverifikasi email...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, payload, {
      headers: headers
    });

    if (response.data.code === 0) {
      spinner.succeed('Email berhasil diverifikasi');
      return true;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }

  } catch (error) {
    const errorMsg = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    
    spinner.fail(' Failed to verify email: ' + errorMsg);
    return false;
  }
}

// ========================================
// Get IP Address Function
// ========================================

async function getIpAddress(axiosInstance) {
  const url = 'https://api.ipify.org?format=json';

  try {
    const response = await axiosInstance.get(url);
    return response.data.ip;
  } catch (error) {
    console.log(RED + 'Failed to get IP address: ' + error.message + RESET);
    return 'unknown';
  }
}

// ========================================
// PART 6: WebAuthn Functions
// ========================================

async function getOptions(axiosInstance, emailAddress, referralCode) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/webauthn/options';
  const payload = {
    email: emailAddress,
    type: 0
  };

  const spinner = createSpinner('Mendapatkan options...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, payload, {
      headers: getGlobalHeaders(url, referralCode)
    });

    if (response.data.code === 0) {
      spinner.succeed('Options berhasil didapatkan');
      return response.data.data;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }

  } catch (error) {
    const errorMsg = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    
    spinner.fail(' Failed to get options: ' + errorMsg);
    return null;
  }
}

async function generateCredential(options) {
  const challenge = options.publicKey;
  const rpId = options.rp.id;
  const origin = 'https://dashboard.allscale.io';

  // Create client data JSON
  const clientData = {
    type: 'webauthn.create',
    challenge: challenge,
    origin: origin,
    crossOrigin: false
  };

  const clientDataJSON = Buffer.from(JSON.stringify(clientData));
  const clientDataBase64 = clientDataJSON.toString('base64');

  // Generate EC key pair
  const keyPair = await new Promise((resolve, reject) => {
    crypto.generateKeyPair('ec', {
      namedCurve: 'prime256v1'
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          publicKey: publicKey,
          privateKey: privateKey
        });
      }
    });
  });

  // Export public key
  const publicKeyPem = keyPair.publicKey.export({
    type: 'spki',
    format: 'pem'
  });

  const privateKeyPem = keyPair.privateKey.export({
    type: 'pkcs8',
    format: 'pem'
  });

  const publicKeyDer = keyPair.publicKey.export({
    type: 'spki',
    format: 'der'
  });

  // Extract x and y coordinates from public key
  const uncompressed = publicKeyDer.slice(26);
  const x = uncompressed.slice(1, 33);
  const y = uncompressed.slice(33);

  // Create COSE key
  const coseKey = new Map();
  coseKey.set(1, 2);      // kty: EC2
  coseKey.set(3, -7);     // alg: ES256
  coseKey.set(-1, 1);     // crv: P-256
  coseKey.set(-2, x);     // x coordinate
  coseKey.set(-3, y);     // y coordinate

  const coseKeyEncoded = cbor.encode(coseKey);

  // Generate credential ID
  const credentialId = crypto.randomBytes(16);
  const credentialIdBase64 = credentialId.toString('base64');

  // Create authenticator data
  const rpIdHash = Buffer.alloc(16, 0);
  const credIdLength = Buffer.alloc(2);
  credIdLength.writeUInt16BE(credentialId.length, 0);

  const attestedCredData = Buffer.concat([
    rpIdHash,
    credIdLength,
    credentialId,
    coseKeyEncoded
  ]);

  // Create full authenticator data
  const rpIdHashSHA256 = crypto.createHash('sha256').update(rpId).digest();
  const flags = 0x41; // UP + AT flags
  const signCount = Buffer.alloc(4, 0);

  const authData = Buffer.concat([
    rpIdHashSHA256,
    Buffer.from([flags]),
    signCount,
    attestedCredData
  ]);

  // Create attestation object
  const attObj = new Map();
  attObj.set('fmt', 'none');
  attObj.set('attStmt', new Map());
  attObj.set('authData', authData);

  const attObjEncoded = cbor.encode(attObj);
  const attObjBase64 = attObjEncoded.toString('base64');

  // Clean up credential ID for return
  const credIdClean = credentialIdBase64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return {
    id: credIdClean,
    type: 'public-key',
    rawId: Buffer.from(credentialId).toString('base64'),
    response: {
      clientDataJSON: clientDataBase64,
      attestationObject: attObjBase64
    }
  };
}

// ========================================
// PART 7: Account Registration Function
// ========================================

async function registerAccount(
  axiosInstance, 
  emailAddress, 
  credential, 
  referralCode, 
  userAgent, 
  ipAddress
) {
  // Get WebAuthn options first
  const optionsData = await getOptions(axiosInstance, emailAddress, referralCode);
  
  if (!optionsData) {
    return { success: false };
  }

  // Generate WebAuthn credential
  const generatedCredential = await generateCredential(optionsData.options);

  const url = 'https://dashboard.allscale.io/api/public/businesses/webauthn/register';
  const payload = {
    credential_json: generatedCredential,
    email: emailAddress,
    user_id: optionsData.user_id,
    referer_id: referralCode,
    device_id_str: uuidv4(),
    device_type: 1,
    ip_address: ipAddress,
    user_agent: userAgent
  };

  const spinner = createSpinner('Mendaftarkan akun...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, payload, {
      headers: getGlobalHeaders(url, referralCode)
    });

    if (response.data.code === 0) {
      spinner.succeed('Akun berhasil didaftarkan!');
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }

  } catch (error) {
    const errorMsg = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    
    spinner.fail(' Failed to register: ' + errorMsg);
    return { success: false };
  }
}

// ========================================
// Main Registration Flow
// ========================================

async function doRegister(axiosInstance, referralCode, accountPrefix) {
  const userAgent = new UserAgent().toString();
  const ipAddress = await getIpAddress(axiosInstance);

  // Select random email provider
  const provider = providers[Math.floor(Math.random() * providers.length)];

  // Create temporary email
  const emailData = await getTempEmail(provider, axiosInstance, ipAddress, userAgent);
  
  if (!emailData) {
    return { success: false };
  }

  const emailAddress = emailData.address;
  console.log(`${GREEN}${BOLD}📧 Email: ${emailAddress}${RESET}`);

  // Register account
  const { success: regSuccess, data: regData } = await registerAccount(
    axiosInstance,
    emailAddress,
    null,
    referralCode,
    userAgent,
    ipAddress
  );

  if (!regSuccess) {
    return { success: false };
  }

  // Wait before sending verification
  const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  await delay(randomDelay);

  // Send verification code
  const sentSuccess = await sendVerification(
    axiosInstance,
    emailAddress,
    regData.token
  );

  if (!sentSuccess) {
    return { success: false };
  }

  // Check inbox for verification code
  const verificationCode = await checkInbox(
    provider,
    axiosInstance,
    emailData
  );

  if (!verificationCode) {
    return { success: false };
  }

  // Verify email with code
  const verifySuccess = await verifyEmail(
    axiosInstance,
    emailAddress,
    verificationCode,
    regData.token
  );

  if (!verifySuccess) {
    return { success: false };
  }

  return {
    success: true,
    email: emailAddress,
    token: regData.token,
    refresh_token: regData.token
  };
}

// ========================================
// PART 8: Main Function
// ========================================

async function main() {
  // Ask if user wants to use proxy
  const { useProxy } = await inquirer.prompt([{
    type: 'confirm',
    name: 'useProxy',
    message: CYAN + 'Apakah Anda ingin menggunakan proxy?' + RESET,
    default: false
  }]);

  let proxies = [];
  let proxyType = null;
  let axiosInstance = axios.create();

  // Proxy setup
  if (useProxy) {
    const proxyConfig = await inquirer.prompt([{
      type: 'list',
      name: 'proxyType',
      message: CYAN + 'Pilih tipe proxy:' + RESET,
      choices: ['Rotating', 'Static']
    }]);

    proxyType = proxyConfig.proxyType;
    proxies = readProxiesFromFile('proxy.txt');

    if (proxies.length > 0) {
      console.log(BLUE + 'Berhasil memuat ' + proxies.length + ' proxy dari file' + RESET + '\n');
    } else {
      console.log(YELLOW + 'File proxy.txt kosong atau tidak ditemukan, tidak menggunakan proxy.' + RESET + '\n');
    }
  }

  // Ask for number of accounts
  let accountCount;
  while (true) {
    const answer = await inquirer.prompt([{
      type: 'input',
      name: 'count',
      message: CYAN + 'Masukkan jumlah akun yang ingin dibuat:' + RESET,
      validate: (input) => {
        const num = parseInt(input, 10);
        return isNaN(num) || num <= 0 
          ? RED + 'Harap masukkan angka yang valid' + RESET 
          : true;
      }
    }]);

    accountCount = parseInt(answer.count, 10);
    if (accountCount > 0) break;
  }

  // Ask for referral code
  const { referralCode } = await inquirer.prompt([{
    type: 'input',
    name: 'referralCode',
    message: CYAN + 'Masukkan kode referral:' + RESET
  }]);

  console.log(YELLOW + '═══════════════════════════════════════════════════════════' + RESET);
  console.log(`${YELLOW}${BOLD}🚀 Memulai proses pembuatan ${accountCount} Akun ..${RESET}`);
  console.log(YELLOW + '═══════════════════════════════════════════════════════════' + RESET);
  console.log(YELLOW + '📌 Referral Code: ' + referralCode + RESET + '\n');

  const accountsFile = 'account.json';
  let savedAccounts = [];

  // Load existing accounts
  if (fs.existsSync(accountsFile)) {
    try {
      savedAccounts = JSON.parse(fs.readFileSync(accountsFile, 'utf8'));
    } catch (error) {
      savedAccounts = [];
    }
  }

  let successCount = 0;
  let failCount = 0;

  // Main loop - create accounts
  for (let i = 0; i < accountCount; i++) {
    console.log(`${CYAN}${BOLD}═══════════════ Akun ${i + 1}/${accountCount} ═══════════════════════════════════${RESET}`);

    let proxyUrl = null;

    // Setup proxy if enabled
    if (useProxy && proxies.length > 0) {
      if (proxyType === 'Rotating') {
        proxyUrl = proxies[Math.floor(Math.random() * proxies.length)];
      } else {
        proxyUrl = proxies.shift();

        if (!proxyUrl) {
          console.log(RED + 'Proxy habis, menghentikan proses' + RESET);
          process.exit(1);
        }
      }

      console.log(WHITE + '🔄 Menggunakan proxy: ' + proxyUrl + RESET);

      const proxyAgent = new HttpsProxyAgent(proxyUrl);
      axiosInstance = axios.create({
        httpAgent: proxyAgent,
        httpsAgent: proxyAgent
      });
    } else {
      axiosInstance = axios.create();
    }

    // Get current IP
    let currentIp = '';
    try {
      const ipResponse = await axiosInstance.get('https://api.ipify.org?format=json');
      currentIp = ipResponse.data.ip;
    } catch (error) {
      currentIp = 'unknown';
      console.log(RED + 'Gagal mendapatkan IP: ' + error.message + RESET);
    }

    console.log(WHITE + '🌍 IP Address: ' + currentIp + RESET + '\n');

    // Register account
    const { 
      success: regSuccess, 
      email, 
      token, 
      refresh_token 
    } = await doRegister(axiosInstance, referralCode, 'account_' + (i + 1));

    if (!regSuccess) {
      failCount++;
      console.log(YELLOW + `📊 Progress: Akun ${i + 1}/${accountCount} (Berhasil: ${successCount}, Gagal: ${failCount})` + RESET);
      console.log(`${CYAN}${BOLD}════════════════════════════════════════════════════════════════════${RESET}\n`);
      continue;
    }

    // Save account to file
    savedAccounts.push({
      email: email,
      token: token,
      refresh_token: refresh_token,
      registeredAt: new Date().toISOString()
    });

    try {
      fs.writeFileSync(accountsFile, JSON.stringify(savedAccounts, null, 2));
      console.log(`${GREEN}${BOLD}💾 Akun tersimpan di ${accountsFile}${RESET}`);
    } catch (error) {
      console.log(RED + 'Gagal menyimpan ke ' + accountsFile + ': ' + error.message + RESET);
    }

    successCount++;
    console.log(YELLOW + `📊 Progress: Akun ${i + 1}/${accountCount} (Berhasil: ${successCount}, Gagal: ${failCount})` + RESET);
    console.log(`${CYAN}${BOLD}════════════════════════════════════════════════════════════════════${RESET}\n`);

    // Delay before next account (except for last one)
    if (i < accountCount - 1) {
      const delayTime = Math.floor(Math.random() * (40000 - 25000 + 1)) + 25000;
      await countdown(delayTime);
    }
  }

  console.log(`${BLUE}${BOLD}✅ Proses selesai!${RESET}`);
}

// ========================================
// Run Main Function
// ========================================

main().catch(error => {
  console.log(RED + '❌ Error: ' + error.message + RESET);
});

