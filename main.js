const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cfonts = require('cfonts');
const UserAgent = require('user-agents');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const cbor = require('cbor');

// ANSI Color Codes
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

// Create animated spinner
function createSpinner(message) {
  let frameIndex = 0;
  let interval = null;
  let isRunning = false;

  function clearLine() {
    try {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    } catch (err) {}
  }

  return {
    start() {
      if (isRunning) return;
      isRunning = true;
      clearLine();
      process.stdout.write(`${CYAN}${SPINNER_FRAMES[frameIndex]} ${message}${RESET}`);
      
      interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
        clearLine();
        process.stdout.write(`${CYAN}${SPINNER_FRAMES[frameIndex]} ${message}${RESET}`);
      }, 100);
    },
    
    succeed(successMessage) {
      if (!isRunning) return;
      clearInterval(interval);
      isRunning = false;
      clearLine();
      process.stdout.write(`${GREEN}${BOLD}✔ ${successMessage}${RESET}\n`);
    },
    
    fail(errorMessage) {
      if (!isRunning) return;
      clearInterval(interval);
      isRunning = false;
      clearLine();
      process.stdout.write(`${RED}✖ ${errorMessage}${RESET}\n`);
    },
    
    stop() {
      if (!isRunning) return;
      clearInterval(interval);
      isRunning = false;
      clearLine();
    }
  };
}

// Center text in terminal
function centerText(text) {
  const columns = process.stdout.columns || 80;
  const textLength = text.replace(/\x1b\[[0-9;]*m/g, '').length;
  const padding = Math.max(0, Math.floor((columns - textLength) / 2));
  return ' '.repeat(padding) + text;
}

// Display banner
cfonts.say('ALLSCALE', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'black']
});

console.log(centerText(BLUE + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + RESET));
console.log(centerText(CYAN + '✪ BOT AUTO REFERRAL ASP ✪' + RESET + '\n'));

// Delay helper
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Countdown display
async function countdown(ms, message = 'Waiting') {
  const seconds = Math.floor(ms / 1000);
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`${YELLOW}\r${message} ${i} seconds...${RESET}`);
    await delay(1000);
  }
  process.stdout.write('\r' + ' '.repeat(50) + '\r');
}

// Read proxies from file
function readProxiesFromFile(filename) {
  try {
    const content = fs.readFileSync(filename, 'utf-8');
    return content.split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
  } catch (error) {
    console.log(`${RED}Gagal membaca file proxy.txt: ${error.message}${RESET}`);
    return [];
  }
}

// Generate global headers
function getGlobalHeaders(url, refCode, extraHeaders = {}) {
  const userAgent = new UserAgent();
  const headers = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9,id;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'origin': 'https://dashboard.allscale.io',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': `https://dashboard.allscale.io/?code=${refCode}`,
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': userAgent.toString()
  };

  // Add timestamp and signature for specific endpoints
  if (url.includes('secret-key')) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto.createHash('sha256')
      .update('vT*IUEGgyL' + timestamp)
      .digest('hex');
    headers['timestamp'] = timestamp;
    headers['secret-key'] = signature;
  }

  return Object.assign(headers, extraHeaders);
}

// Email providers
const providers = ['mail.tm', 'guerrillamail'];

// Get temporary email
async function getTempEmail(provider, axiosInstance, ip, userAgent) {
  if (provider === 'mail.tm') {
    try {
      let domains = [];
      let page = 1;

      // Fetch available domains
      while (true) {
        const url = `https://api.mail.tm/domains?page=${page}`;
        const response = await axios.get(url);
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch domains');
        }

        const data = response.data;
        const domainList = data['hydra:member'] || [];
        const activeDomains = domainList.filter(d => d.isActive && !d.isPrivate);
        
        domains = domains.concat(activeDomains);

        if (!data['hydra:view'] || !data['hydra:view']['hydra:next']) break;
        page++;
      }

      if (domains.length === 0) {
        throw new Error('No domains available');
      }

      // Select random domain
      const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
      const domain = selectedDomain.domain;
      const username = Math.random().toString(36).substring(2, 15);
      const address = `${username}@${domain}`;
      const password = 'Password123!';

      // Register email
      const registerUrl = 'https://api.mail.tm/accounts';
      const registerData = {
        address: address,
        password: password
      };

      const registerResponse = await axios.post(registerUrl, registerData);

      if (registerResponse.status === 201) {
        console.log(`${GREEN}Generated Temp Email : ${address}${RESET}`);
        return {
          provider: 'mail.tm',
          address: address,
          password: password,
          login: username,
          domain: domain
        };
      } else {
        throw new Error('Failed to register email');
      }
    } catch (error) {
      console.log(`${RED}Failed to generate temp email : ${error.message}${RESET}`);
      return null;
    }
  } else if (provider === 'guerrillamail') {
    const url = 'https://api.guerrillamail.com/ajax.php';
    const params = {
      f: 'get_email_address',
      lang: 'en',
      ip: ip,
      agent: userAgent
    };

    try {
      const response = await axiosInstance.get(url, { params });
      const data = response.data;
      const emailAddress = data.email_addr;
      const sidToken = data.sid_token || '';
      
      let phpsessid = '';
      if (response.headers['set-cookie']) {
        response.headers['set-cookie'].forEach(cookie => {
          if (cookie.includes('PHPSESSID')) {
            phpsessid = cookie.split(';')[0].split('=')[1];
          }
        });
      }

      console.log(`${GREEN}Generated Temp Email : ${emailAddress}${RESET}`);
      return {
        provider: 'guerrillamail',
        address: emailAddress,
        sid_token: sidToken,
        phpsessid: phpsessid
      };
    } catch (error) {
      console.log(`${RED}Failed to generate temp email : ${error.message}${RESET}`);
      return null;
    }
  }

  return null;
}

// Get Mail.tm token
async function getMailTmToken(axiosInstance, address, password) {
  const url = 'https://api.mail.tm/token';
  const data = {
    address: address,
    password: password
  };

  try {
    const response = await axios.post(url, data);
    return response.data.token;
  } catch (error) {
    console.log(`${RED}Failed to get token: ${error.message}${RESET}`);
    return null;
  }
}

// Check inbox for verification code
async function checkInbox(provider, axiosInstance, emailData, maxAttempts = 15, delayMs = 8000) {
  if (provider === 'mail.tm') {
    const token = await getMailTmToken(axiosInstance, emailData.address, emailData.password);
    if (!token) return null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const url = 'https://api.mail.tm/messages';
      
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const messages = response.data['hydra:member'];
        
        if (messages.length > 0) {
          const messageId = messages[0].id;
          const messageUrl = `https://api.mail.tm/messages/${messageId}`;
          
          const messageResponse = await axios.get(messageUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const messageText = messageResponse.data.text || messageResponse.data.html;
          const codeMatch = messageText.match(/verification code is (\d{6})/);
          
          if (codeMatch) return codeMatch[1];
        }
      } catch (error) {
        console.log(`${YELLOW}Attempt ${attempt}: No email yet - ${error.message}${RESET}`);
      }

      await delay(delayMs);
    }

    console.log(`${RED}No verification email received after ${maxAttempts} attempts${RESET}`);
    return null;
  } else if (provider === 'guerrillamail') {
    const sidToken = emailData.sid_token;
    const phpsessid = emailData.phpsessid;
    const cookies = {
      'Cookie': `PHPSESSID=${phpsessid}`
    };

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const url = 'https://api.guerrillamail.com/ajax.php';
      const params = {
        f: 'get_email_list',
        seq: 0
      };

      try {
        const response = await axiosInstance.get(url, {
          params: params,
          headers: cookies
        });

        const emailList = response.data.list || [];
        
        if (emailList.length > 0) {
          const email = emailList[0];
          const fetchParams = {
            f: 'fetch_email',
            email_id: email.mail_id
          };

          const fetchResponse = await axiosInstance.get(url, {
            params: fetchParams,
            headers: cookies
          });

          const mailBody = fetchResponse.data.mail_body || '';
          const codeMatch = mailBody.match(/verification code is (\d{6})/);
          
          if (codeMatch) return codeMatch[1];
        }
      } catch (error) {
        console.log(`${YELLOW}Attempt ${attempt}: No email yet - ${error.message}${RESET}`);
      }

      await delay(delayMs);
    }

    console.log(`${RED}No verification email received after ${maxAttempts} attempts${RESET}`);
    return null;
  }

  return null;
}

// Send verification email
async function sendVerification(axiosInstance, email, token) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/email/verify';
  const data = { email: email };
  const headers = {
    ...getGlobalHeaders(url, ''),
    'authorization': `Bearer ${token}`,
    'referer': 'https://dashboard.allscale.io/signup'
  };

  const spinner = createSpinner('Sending verification email...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, data, { headers });
    
    if (response.data.code === 0) {
      spinner.succeed('Verification sent successfully');
      return true;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail('Failed to send verification: ' + errorMsg);
    return false;
  }
}

// Verify email with code
async function verifyEmail(axiosInstance, email, code, token) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/email/verify/code';
  const data = {
    email: email,
    code: code
  };
  const headers = {
    ...getGlobalHeaders(url, ''),
    'authorization': `Bearer ${token}`,
    'referer': 'https://dashboard.allscale.io/signup'
  };

  const spinner = createSpinner('Verifying email...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, data, { headers });
    
    if (response.data.code === 0) {
      spinner.succeed('Email verified successfully');
      return true;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail('Failed to verify: ' + errorMsg);
    return false;
  }
}

// Get registration options
async function getOptions(axiosInstance, email, refCode) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/webauthn/options';
  const data = {
    email: email,
    type: 0
  };

  const spinner = createSpinner('Getting options...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, data, {
      headers: getGlobalHeaders(url, refCode)
    });

    if (response.data.code === 0) {
      spinner.succeed('Options received');
      return response.data.data;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail('Failed to get options: ' + errorMsg);
    return null;
  }
}

// Get IP address
async function getIpAddress(axiosInstance) {
  const url = 'https://api.ipify.org?format=json';
  
  try {
    const response = await axiosInstance.get(url);
    return response.data.ip;
  } catch (error) {
    console.log(`${RED}Failed to get IP: ${error.message}${RESET}`);
    return 'unknown';
  }
}

// Generate WebAuthn credential
async function generateCredential(options) {
  const challenge = options.challenge;
  const rpId = options.rp.id;
  const origin = 'https://dashboard.allscale.io';

  // Create client data JSON
  const clientData = {
    type: 'webauthn.create',
    challenge: challenge,
    origin: origin,
    crossOrigin: false
  };

  const clientDataBuffer = Buffer.from(JSON.stringify(clientData));
  const clientDataJSON = clientDataBuffer.toString('base64');

  // Generate key pair
  const keyPair = await new Promise((resolve, reject) => {
    crypto.generateKeyPair('ec', { namedCurve: 'P-256' }, (err, publicKey, privateKey) => {
      if (err) reject(err);
      else resolve({ publicKey, privateKey });
    });
  });

  // Export public key
  const publicKeySpki = keyPair.publicKey.export({ type: 'spki', format: 'der' });
  const privateKeyPkcs8 = keyPair.privateKey.export({ type: 'pkcs8', format: 'pem' });
  const publicKeyDer = keyPair.publicKey.export({ type: 'spki', format: 'der' });

  // Extract coordinates
  const uncompressed = publicKeyDer.slice(26);
  const x = uncompressed.slice(1, 33);
  const y = uncompressed.slice(33);

  // Create COSE key
  const coseKey = new Map();
  coseKey.set(1, 2); // kty: EC2
  coseKey.set(3, -7); // alg: ES256
  coseKey.set(-1, 1); // crv: P-256
  coseKey.set(-2, x); // x coordinate
  coseKey.set(-3, y); // y coordinate

  const coseKeyEncoded = cbor.encode(coseKey);

  // Create credential ID
  const credentialId = crypto.randomBytes(16);
  const credentialIdBase64 = credentialId.toString('base64');

  // Create authenticator data
  const rpIdHash = crypto.createHash('sha256').update(rpId).digest();
  const flags = 0x41; // UP + AT flags
  const counter = Buffer.alloc(4, 0);
  const aaguid = Buffer.alloc(16, 0);
  const credIdLength = Buffer.alloc(2);
  credIdLength.writeUInt16BE(credentialId.length, 0);

  const authenticatorData = Buffer.concat([
    rpIdHash,
    Buffer.from([flags]),
    counter,
    aaguid,
    credIdLength,
    credentialId,
    coseKeyEncoded
  ]);

  // Create attestation object
  const attestationObject = new Map();
  attestationObject.set('fmt', 'none');
  attestationObject.set('attStmt', new Map());
  attestationObject.set('authData', authenticatorData);

  const attestationObjectEncoded = cbor.encode(attestationObject);
  const attestationObjectBase64 = attestationObjectEncoded.toString('base64');

  // Clean up credential ID for response
  const cleanCredentialId = credentialIdBase64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return {
    id: cleanCredentialId,
    type: 'public-key',
    rawId: Buffer.from(credentialId).toString('base64'),
    response: {
      clientDataJSON: clientDataJSON,
      attestationObject: attestationObjectBase64
    }
  };
}

// Register account
async function registerAccount(axiosInstance, email, username, refCode, userAgent, ipAddress) {
  const optionsData = await getOptions(axiosInstance, email, refCode);
  if (!optionsData) return { success: false };

  const credential = await generateCredential(optionsData.options);

  const url = 'https://dashboard.allscale.io/api/public/businesses/webauthn/register';
  const data = {
    credential_json: credential,
    email: email,
    user_id: optionsData.user_id,
    referer_id: refCode,
    device_id_str: uuidv4(),
    device_type: 1,
    ip_address: ipAddress,
    user_agent: userAgent
  };

  const spinner = createSpinner('Registering account...');
  spinner.start();

  try {
    const response = await axiosInstance.post(url, data, {
      headers: getGlobalHeaders(url, refCode)
    });

    if (response.data.code === 0) {
      spinner.succeed(' Registration successful!');
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail(' Failed to register: ' + errorMsg);
    return { success: false };
  }
}

// Complete registration process
async function doRegister(axiosInstance, refCode, username) {
  const userAgent = new UserAgent().toString();
  const ipAddress = await getIpAddress(axiosInstance);

  // Get temporary email
  const provider = providers[Math.floor(Math.random() * providers.length)];
  const emailData = await getTempEmail(provider, axiosInstance, ipAddress, userAgent);
  
  if (!emailData) return { success: false };

  const email = emailData.address;
  console.log(`${GREEN}${BOLD}Using email: ${email}${RESET}`);

  // Register account
  const { success: regSuccess, data: regData } = await registerAccount(
    axiosInstance,
    email,
    null,
    refCode,
    userAgent,
    ipAddress
  );

  if (!regSuccess) return { success: false };

  // Send verification email
  const sendSuccess = await sendVerification(axiosInstance, email, regData.token);
  if (!sendSuccess) return { success: false };

  // Check inbox for verification code
  const verificationCode = await checkInbox(provider, axiosInstance, emailData);

  if (!verificationCode) {
    // Manual input
    const { verifCode } = await inquirer.prompt([{
      type: 'input',
      name: 'verifCode',
      message: `${CYAN}Enter verification code manually: ${RESET}`
    }]);

    if (verifCode) {
      const verifySuccess = await verifyEmail(axiosInstance, email, verifCode, regData.token);
      if (verifySuccess) {
        return {
          success: true,
          email: email,
          token: regData.token,
          refresh_token: regData.token
        };
      }
    }
    return { success: false };
  }

  // Verify email with code
  const verifySuccess = await verifyEmail(axiosInstance, email, verificationCode, regData.token);
  if (!verifySuccess) return { success: false };

  return {
    success: true,
    email: email,
    token: regData.token,
    refresh_token: regData.token
  };
}

// Main function
async function main() {
  // Ask about proxy usage
  const { useProxy } = await inquirer.prompt([{
    type: 'confirm',
    name: 'useProxy',
    message: `${CYAN}Do you want to use proxy? ${RESET}`,
    default: false
  }]);

  let proxies = [];
  let proxyMode = null;
  let axiosInstance = axios.create();

  if (useProxy) {
    const { proxyMode: mode } = await inquirer.prompt([{
      type: 'list',
      name: 'proxyMode',
      message: `${CYAN}Select proxy mode: ${RESET}`,
      choices: ['Rotating', 'Static']
    }]);

    proxyMode = mode;
    proxies = readProxiesFromFile('proxy.txt');

    if (proxies.length > 0) {
      console.log(`${BLUE}Loaded ${proxies.length} proxies.${RESET}\n`);
    } else {
      console.log(`${YELLOW}No proxies found in proxy.txt${RESET}\n`);
    }
  }

  // Ask for number of accounts
  let accountCount;
  while (true) {
    const { count } = await inquirer.prompt([{
      type: 'input',
      name: 'count',
      message: `${CYAN}Enter number of accounts to create: ${RESET}`,
      validate: (input) => {
        const num = parseInt(input, 10);
        return isNaN(num) || num <= 0 
          ? `${RED}Please enter a valid positive number${RESET}` 
          : true;
      }
    }]);

    accountCount = parseInt(count, 10);
    if (accountCount > 0) break;
  }

  // Ask for referral code
  const { referralCode } = await inquirer.prompt([{
    type: 'input',
    name: 'referralCode',
    message: `${CYAN}Enter referral code: ${RESET}`
  }]);

  console.log(`${YELLOW}Starting registration process...${RESET}`);
  console.log(`${YELLOW}${BOLD}Total accounts: ${accountCount} accounts${RESET}`);
  console.log(`${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
  console.log(`${YELLOW}Please wait while accounts are being created...${RESET}\n`);

  // Load or create results file
  const resultsFile = 'registered_accounts.json';
  let results = [];

  if (fs.existsSync(resultsFile)) {
    try {
      results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
    } catch (err) {
      results = [];
    }
  }

  let successCount = 0;
  let failCount = 0;

  // Process each account
  for (let i = 0; i < accountCount; i++) {
    console.log(`${CYAN}${BOLD}\n================================ ACCOUNT ${i + 1}/${accountCount} ================================${RESET}`);

    // Setup proxy if enabled
    let currentProxy = null;
    if (useProxy && proxies.length > 0) {
      if (proxyMode === 'Static') {
        currentProxy = proxies[Math.floor(Math.random() * proxies.length)];
      } else {
        currentProxy = proxies.shift();
      }

      if (!currentProxy) {
        console.log(`${RED}Tidak ada proxy yang tersisa untuk mode static.${RESET}`);
        process.exit(1);
      }

      console.log(`${WHITE}Menggunakan proxy: ${currentProxy}${RESET}`);

      const proxyAgent = new HttpsProxyAgent(currentProxy);
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
    } catch (err) {
      currentIp = 'unknown';
      console.log(`${RED}Failed to get IP: ${err.message}${RESET}`);
    }

    console.log(`${WHITE}Current IP Address: ${currentIp}${RESET}\n`);

    // Register account
    const { success, email, token, refresh_token } = await doRegister(
      axiosInstance,
      referralCode,
      `user${i + 1}`
    );

    if (!success) {
      failCount++;
      console.log(`${YELLOW}\nProgress: ${i + 1}/${accountCount} akun telah diproses. (Berhasil: ${successCount}, Gagal: ${failCount})${RESET}`);
      console.log(`${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
      continue;
    }

    // Save result
    results.push({
      email: email,
      token: token,
      refresh_token: refresh_token,
      registeredAt: new Date().toISOString()
    });

    try {
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
      console.log(`${GREEN}${BOLD}Account saved to ${resultsFile}${RESET}`);
    } catch (err) {
      console.log(`${RED}Failed to save to ${resultsFile}: ${err.message}${RESET}`);
    }

    successCount++;
    console.log(`${YELLOW}\nProgress: ${i + 1}/${accountCount} akun telah diproses. (Berhasil: ${successCount}, Gagal: ${failCount})${RESET}`);
    console.log(`${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

    // Delay before next account
    if (i < accountCount - 1) {
      const delayTime = Math.floor(Math.random() * (40000 - 25000 + 1)) + 25000;
      await countdown(delayTime);
    }
  }

  console.log(`${BLUE}${BOLD}\nProses selesai.${RESET}`);
}

// Run main function
main().catch(err => console.log(`${RED}Error: ${err.message}${RESET}`));
