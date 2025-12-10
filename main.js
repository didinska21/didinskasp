const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cfonts = require('cfonts');
const UserAgent = require('user-agents');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const cbor = require('cbor');

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';
const BOLD = '\x1b[1m';
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function createSpinner(message) {
  let frameIndex = 0;
  let intervalId = null;
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
      process.stdout.write('' + CYAN + SPINNER_FRAMES[frameIndex] + ' ' + message + RESET);
      intervalId = setInterval(() => {
        frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
        clearLine();
        process.stdout.write('' + CYAN + SPINNER_FRAMES[frameIndex] + ' ' + message + RESET);
      }, 100);
    },
    succeed(successMessage) {
      if (!isRunning) return;
      clearInterval(intervalId);
      isRunning = false;
      clearLine();
      process.stdout.write('' + GREEN + BOLD + '✔ ' + successMessage + RESET + '\n');
    },
    fail(errorMessage) {
      if (!isRunning) return;
      clearInterval(intervalId);
      isRunning = false;
      clearLine();
      process.stdout.write(RED + '✖ ' + errorMessage + RESET + '\n');
    },
    stop() {
      if (!isRunning) return;
      clearInterval(intervalId);
      isRunning = false;
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

cfonts.say('ASP BOT', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'black']
});

console.log(centerText(BLUE + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + RESET));
console.log(centerText(CYAN + '★ BOT AUTO REFERRAL ASP ★' + RESET + '\n'));

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown(ms, message = 'Waiting') {
  const seconds = Math.floor(ms / 1000);
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(YELLOW + '\r' + message + ' ' + i + ' seconds...' + RESET);
    await delay(1000);
  }
  process.stdout.write('\r' + ' '.repeat(50) + '\r');
}

function readProxiesFromFile(filename) {
  try {
    const content = fs.readFileSync(filename, 'utf-8');
    return content.split('\n').map(line => line.trim()).filter(line => line !== '');
  } catch (error) {
    console.log(RED + 'Gagal membaca file proxy.txt: ' + error.message + RESET);
    return [];
  }
}

function getGlobalHeaders(url, referrer, additionalHeaders = {}) {
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
    'referer': 'https://dashboard.allscale.io/' + referrer,
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': userAgent.toString()
  };

  if (url.includes('secret-key')) {
    const timestamp = Math.floor(Date.now() / 1000);
    const secretKey = crypto.createHash('sha256').update('vT*IUEGgyL' + timestamp).digest('hex');
    headers['timestamp'] = timestamp;
    headers['secret-key'] = secretKey;
  }

  return Object.assign(headers, additionalHeaders), headers;
}

const providers = ['mail.tm', 'guerrillamail'];

async function getTempEmail(provider, axiosInstance, ipAddress, userAgent) {
  if (provider === 'mail.tm') {
    try {
      let domains = [];
      let page = 1;
      
      while (true) {
        const url = 'https://api.mail.tm/domains?page=' + page;
        const response = await axios.get(url);
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch domains');
        }
        
        const data = response.data;
        const allDomains = data['hydra:member'] || [];
        const activeDomains = allDomains.filter(domain => domain.isActive && !domain.isPrivate);
        domains = domains.concat(activeDomains);
        
        if (!data['hydra:view'] || !data['hydra:view']['hydra:next']) break;
        page++;
      }
      
      if (domains.length === 0) {
        throw new Error('Failed to fetch domains');
      }
      
      const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
      const domainName = selectedDomain.domain;
      const username = Math.random().toString(36).substring(2, 15);
      const email = username + '@' + domainName;
      const password = 'Password123!';
      const registerUrl = 'https://api.mail.tm/accounts';
      const registerData = {
        'address': email,
        'password': password
      };
      
      const registerResponse = await axios.post(registerUrl, registerData);
      
      if (registerResponse.status === 201) {
        console.log(GREEN + 'Generated Temp Email : ' + email + RESET);
        return {
          'provider': 'mail.tm',
          'address': email,
          'password': password,
          'login': username,
          'domain': domainName
        };
      } else {
        throw new Error('Failed to create temp email');
      }
    } catch (error) {
      console.log(RED + 'Failed to generate temp email : ' + error.message + RESET);
      return null;
    }
  } else if (provider === 'guerrillamail') {
    const apiUrl = 'https://api.guerrillamail.com/ajax.php';
    const params = {
      'f': 'get_email_address',
      'lang': 'en',
      'ip': ipAddress,
      'agent': userAgent
    };
    
    try {
      const response = await axiosInstance.get(apiUrl, { params: params });
      const data = response.data;
      const email = data.email_addr;
      const sidToken = data.sid_token || '';
      let phpsessid = '';
      
      if (response.headers['set-cookie']) {
        response.headers['set-cookie'].forEach(cookie => {
          if (cookie.includes('PHPSESSID')) {
            phpsessid = cookie.split(';')[0].split('=')[1];
          }
        });
      }
      
      console.log(GREEN + 'Generated Temp Email : ' + email + RESET);
      return {
        'provider': 'guerrillamail',
        'address': email,
        'sid_token': sidToken,
        'phpsessid': phpsessid
      };
    } catch (error) {
      console.log(RED + 'Failed to generate temp email : ' + error.message + RESET);
      return null;
    }
  }
  
  return null;
}

async function getMailTmToken(axiosInstance, email, password) {
  const url = 'https://api.mail.tm/token';
  const data = {
    'address': email,
    'password': password
  };
  
  try {
    const response = await axios.post(url, data);
    return response.data.token;
  } catch (error) {
    console.log(RED + 'Failed to get token : ' + error.message + RESET);
    return null;
  }
}

async function checkInbox(provider, axiosInstance, emailData, maxAttempts = 15, delayMs = 8000) {
  if (provider === 'mail.tm') {
    const token = await getMailTmToken(axiosInstance, emailData.address, emailData.password);
    if (!token) return null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const url = 'https://api.mail.tm/messages';
      
      try {
        const response = await axios.get(url, {
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
          
          const messageText = messageResponse.data.text || messageResponse.data.html;
          const codeMatch = messageText.match(/verification code is (\d{6})/);
          
          if (codeMatch) return codeMatch[1];
        }
      } catch (error) {
        console.log(YELLOW + 'Attempt ' + attempt + ': No email yet - ' + error.message + RESET);
      }
      
      await delay(delayMs);
    }
    
    console.log(RED + 'No verification email received after ' + maxAttempts + ' attempts' + RESET);
    return null;
  } else if (provider === 'guerrillamail') {
    const sidToken = emailData.sid_token;
    const phpsessid = emailData.phpsessid;
    const cookieHeaders = {
      'Cookie': 'PHPSESSID=' + phpsessid
    };
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const url = 'https://api.guerrillamail.com/ajax.php';
      const params = {
        'f': 'check_email',
        'seq': 0
      };
      
      try {
        const response = await axiosInstance.get(url, {
          params: params,
          headers: cookieHeaders
        });
        
        const emails = response.data.list || [];
        
        if (emails.length > 0) {
          const firstEmail = emails[0];
          const fetchParams = {
            'f': 'fetch_email',
            'email_id': firstEmail.mail_id
          };
          
          const fetchResponse = await axiosInstance.get(url, {
            params: fetchParams,
            headers: cookieHeaders
          });
          
          const mailBody = fetchResponse.data.mail_body || '';
          const codeMatch = mailBody.match(/verification code is (\d{6})/);
          
          if (codeMatch) return codeMatch[1];
        }
      } catch (error) {
        console.log(YELLOW + 'Attempt ' + attempt + ': No email yet - ' + error.message + RESET);
      }
      
      await delay(delayMs);
    }
    
    console.log(RED + 'No verification email received after ' + maxAttempts + ' attempts' + RESET);
    return null;
  }
  
  return null;
}

async function sendVerification(axiosInstance, email, token) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/email/send-verification-code';
  const data = {
    'email': email
  };
  const headers = {
    ...getGlobalHeaders(url, ''),
    'authorization': 'Bearer ' + token,
    'referer': 'https://dashboard.allscale.io/auth/register'
  };
  
  const spinner = createSpinner('Sending verification email...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(url, data, { headers: headers });
    
    if (response.data.code === 0) {
      spinner.succeed('Verification sent');
      return true;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail('Failed to send verification: ' + errorMessage);
    return false;
  }
}

async function verifyEmail(axiosInstance, email, code, token) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/email/verify';
  const data = {
    'email': email,
    'code': code
  };
  const headers = {
    ...getGlobalHeaders(url, ''),
    'authorization': 'Bearer ' + token,
    'referer': 'https://dashboard.allscale.io/auth/register'
  };
  
  const spinner = createSpinner('Verifying email...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(url, data, { headers: headers });
    
    if (response.data.code === 0) {
      spinner.succeed('Email verified');
      return true;
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail('Failed to verify email: ' + errorMessage);
    return false;
  }
}

async function getOptions(axiosInstance, email, referrer) {
  const url = 'https://dashboard.allscale.io/api/public/businesses/webauthn/register/options';
  const data = {
    'email': email,
    'type': 0
  };
  
  const spinner = createSpinner('Getting options...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(url, data, {
      headers: getGlobalHeaders(url, referrer),
      responseType: 'arraybuffer', // ← TAMBAHKAN INI: Terima response sebagai binary
      transformResponse: [] // ← TAMBAHKAN INI: Disable auto-transform
    });
    
    // Decode CBOR binary response
    let decodedData;
    try {
      decodedData = cbor.decode(Buffer.from(response.data));
    } catch (cborError) {
      // Jika bukan CBOR, coba parse sebagai JSON
      const jsonString = Buffer.from(response.data).toString('utf-8');
      decodedData = JSON.parse(jsonString);
    }
    
    // Cek response structure
    if (decodedData.code === 0) {
      spinner.succeed('Options received');
      return decodedData.data;
    } else {
      throw new Error('Server error: ' + JSON.stringify(decodedData));
    }
  } catch (error) {
    let errorMessage = error.message;
    
    // Better error handling
    if (error.response) {
      try {
        // Coba decode error response juga
        const errorData = cbor.decode(Buffer.from(error.response.data));
        errorMessage = JSON.stringify(errorData);
      } catch {
        errorMessage = error.response.data ? error.response.data.toString() : error.message;
      }
    }
    
    spinner.fail('Failed to get options: ' + errorMessage);
    return null;
  }
    }

async function generateCredential(options) {
  const challenge = options.challenge;
  const rpId = options.rp.id;
  const origin = 'https://dashboard.allscale.io';
  
  const clientData = {
    'type': 'webauthn.create',
    'challenge': challenge,
    'origin': origin,
    'crossOrigin': false
  };
  
  const clientDataBuffer = Buffer.from(JSON.stringify(clientData));
  const clientDataJSON = clientDataBuffer.toString('base64');
  
  const keyPair = await new Promise((resolve, reject) => {
    crypto.generateKeyPair('ec', {
      'namedCurve': 'P-256'
    }, (err, publicKey, privateKey) => {
      if (err) reject(err);
      else resolve({
        'publicKey': publicKey,
        'privateKey': privateKey
      });
    });
  });
  
  const publicKeyDer = keyPair.publicKey.export({
    'type': 'spki',
    'format': 'der'
  });
  
  const privateKeyPem = keyPair.privateKey.export({
    'type': 'pkcs8',
    'format': 'pem'
  });
  
  const publicKeyRaw = keyPair.publicKey.export({
    'type': 'spki',
    'format': 'der'
  });
  
  const rawKeyData = publicKeyRaw.slice(26);
  const xCoord = rawKeyData.slice(1, 33);
  const yCoord = rawKeyData.slice(33);
  
  const credentialPublicKey = new Map();
  credentialPublicKey.set(1, 2);
  credentialPublicKey.set(3, -7);
  credentialPublicKey.set(-1, 1);
  credentialPublicKey.set(-2, xCoord);
  credentialPublicKey.set(-3, yCoord);
  
  const credentialPublicKeyCbor = cbor.encode(credentialPublicKey);
  const aaguid = crypto.randomBytes(16);
  const aaguidStr = aaguid.toString('base64');
  const rpIdHash = Buffer.alloc(16, 0);
  const credIdLen = Buffer.alloc(2);
  credIdLen.writeUInt16BE(aaguid.length, 0);
  
  const authData = Buffer.concat([rpIdHash, credIdLen, aaguid, credentialPublicKeyCbor]);
  const rpIdHashReal = crypto.createHash('sha256').update(rpId).digest();
  const flags = 0x41;
  const signCount = Buffer.alloc(4, 0);
  const authenticatorData = Buffer.concat([rpIdHashReal, Buffer.from([flags]), signCount, authData]);
  
  const attestationObject = new Map();
  attestationObject.set('fmt', 'none');
  attestationObject.set('attStmt', new Map());
  attestationObject.set('authData', authenticatorData);
  
  const attestationObjectCbor = cbor.encode(attestationObject);
  const attestationObjectBase64 = attestationObjectCbor.toString('base64');
  const credentialId = aaguidStr.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  return {
    'id': credentialId,
    'type': 'public-key',
    'rawId': Buffer.from(aaguid).toString('base64'),
    'response': {
      'clientDataJSON': clientDataJSON,
      'attestationObject': attestationObjectBase64
    }
  };
}

async function registerAccount(axiosInstance, email, username, referrer, userAgent, ipAddress) {
  const optionsData = await getOptions(axiosInstance, email, referrer);
  if (!optionsData) return { 'success': false };
  
  const credential = await generateCredential(optionsData.options);
  const url = 'https://dashboard.allscale.io/api/public/businesses/webauthn/register';
  const data = {
    'credential_json': credential,
    'email': email,
    'user_id': optionsData.user_id,
    'referer_id': referrer,
    'device_id_str': uuidv4(),
    'device_type': 1,
    'ip_address': ipAddress,
    'user_agent': userAgent
  };
  
  const spinner = createSpinner('Registering account...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(url, data, {
      headers: getGlobalHeaders(url, referrer)
    });
    
    if (response.data.code === 0) {
      spinner.succeed(' Registration successful!');
      return {
        'success': true,
        'data': response.data.data
      };
    } else {
      throw new Error('Server error: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    spinner.fail(' Failed to register: ' + errorMessage);
    return { 'success': false };
  }
}

async function doRegister(axiosInstance, referralCode, proxyInfo) {
  const userAgent = new UserAgent().toString();
  const ipAddress = await getIpAddress(axiosInstance);
  const provider = providers[Math.floor(Math.random() * providers.length)];
  const tempEmail = await getTempEmail(provider, axiosInstance, ipAddress, userAgent);
  
  if (!tempEmail) return { 'success': false };
  
  const email = tempEmail.address;
  console.log('' + GREEN + BOLD + 'Using email: ' + email + RESET);
  
  const { success: regSuccess, data: regData } = await registerAccount(
    axiosInstance,
    email,
    null,
    referralCode,
    userAgent,
    ipAddress
  );
  
  if (!regSuccess) return { 'success': false };
  
  const verifSent = await sendVerification(axiosInstance, email, regData.token);
  if (!verifSent) return { 'success': false };
  
  const verifCode = await checkInbox(provider, axiosInstance, tempEmail);
  
  if (!verifCode) {
    const { verifCode: manualCode } = await inquirer.prompt([{
      'type': 'input',
      'name': 'verifCode',
      'message': CYAN + 'Enter verification code manually: ' + RESET
    }]);
    
    if (manualCode) {
      const verified = await verifyEmail(axiosInstance, email, manualCode, regData.token);
      if (verified) {
        return {
          'success': true,
          'email': email,
          'token': regData.token,
          'refresh_token': regData.refresh_token
        };
      }
    }
    
    return { 'success': false };
  }
  
  const verified = await verifyEmail(axiosInstance, email, verifCode, regData.token);
  if (!verified) return { 'success': false };
  
  return {
    'success': true,
    'email': email,
    'token': regData.token,
    'refresh_token': regData.token
  };
}

async function getIpAddress(axiosInstance) {
  const url = 'https://api.ipify.org?format=json';
  
  try {
    const response = await axiosInstance.get(url);
    return response.data.ip;
  } catch (error) {
    console.log(RED + 'Failed to get IP: ' + error.message + RESET);
    return 'unknown';
  }
}

async function main() {
  const { useProxy } = await inquirer.prompt([{
    'type': 'confirm',
    'name': 'useProxy',
    'message': CYAN + 'Apakah Anda ingin menggunakan proxy?' + RESET,
    'default': false
  }]);
  
  let proxies = [];
  let proxyMode = null;
  let axiosInstance = axios.create();
  
  if (useProxy) {
    const { proxyType } = await inquirer.prompt([{
      'type': 'list',
      'name': 'proxyType',
      'message': CYAN + 'Pilih mode proxy:' + RESET,
      'choices': ['Rotating', 'Static']
    }]);
    
    proxyMode = proxyType;
    proxies = readProxiesFromFile('proxy.txt');
    
    if (proxies.length > 0) {
      console.log(BLUE + 'Loaded ' + proxies.length + ' proxies' + RESET + '\n');
    } else {
      console.log(YELLOW + 'No proxies found in proxy.txt' + RESET + '\n');
    }
  }
  
  let accountCount;
  while (true) {
    const { numAccounts } = await inquirer.prompt([{
      'type': 'input',
      'name': 'numAccounts',
      'message': CYAN + 'Berapa banyak akun yang ingin Anda buat?' + RESET,
      'validate': input => {
        const num = parseInt(input, 10);
        return isNaN(num) || num <= 0 ? RED + 'Masukkan angka yang valid!' + RESET : true;
      }
    }]);
    
    accountCount = parseInt(numAccounts, 10);
    if (accountCount > 0) break;
  }
  
  const { referralCode } = await inquirer.prompt([{
    'type': 'input',
    'name': 'referralCode',
    'message': CYAN + 'Masukkan kode referral:' + RESET
  }]);
  
  console.log(YELLOW + '═══════════════════════════════════════════════════════════════' + RESET);
  console.log('' + YELLOW + BOLD + 'Creating ' + accountCount + ' accounts' + RESET);
  console.log(YELLOW + '═══════════════════════════════════════════════════════════════' + RESET);
  console.log(YELLOW + '⚠ Harap tunggu, proses mungkin memakan waktu...' + RESET + '\n');
  
  const resultsFile = 'registered_accounts.json';
  let results = [];
  
  if (fs.existsSync(resultsFile)) {
    try {
      results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
    } catch (error) {
      results = [];
    }
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < accountCount; i++) {
    console.log('' + CYAN + BOLD + '\n═══════════════════════════════ ACCOUNT ' + (i + 1) + '/' + accountCount + ' ═══════════════════════════════' + RESET);
    
    let proxy = null;
    if (useProxy && proxies.length > 0) {
      if (proxyMode === 'Static') {
        proxy = proxies[Math.floor(Math.random() * proxies.length)];
      } else {
        proxy = proxies.shift();
      }
      
      if (!proxy) {
        console.log(RED + 'Tidak ada proxy yang tersisa untuk mode static.' + RESET);
        process.exit(1);
      }
      
      console.log(WHITE + 'Menggunakan proxy: ' + proxy + RESET);
      const proxyAgent = new HttpsProxyAgent(proxy);
      axiosInstance = axios.create({
        'httpAgent': proxyAgent,
        'httpsAgent': proxyAgent
      });
    } else {
      axiosInstance = axios.create();
    }
    
    let currentIp = '';
    try {
      const ipResponse = await axiosInstance.get('https://api.ipify.org?format=json');
      currentIp = ipResponse.data.ip;
    } catch (error) {
      currentIp = 'unknown';
      console.log(RED + 'Failed to get IP: ' + error.message + RESET);
    }
    
    console.log(WHITE + 'Current IP: ' + currentIp + RESET + '\n');
    
    const { success, email, token, refresh_token } = await doRegister(
      axiosInstance,
      referralCode,
      'account_' + (i + 1)
    );
    
    if (!success) {
      failCount++;
      console.log(YELLOW + '\nProgress: ' + (i + 1) + '/' + accountCount + ' akun telah diproses. (Berhasil: ' + successCount + ', Gagal: ' + failCount + ')' + RESET);
      console.log('' + CYAN + BOLD + '═══════════════════════════════════════════════════════════════' + RESET + '\n');
      continue;
    }
    
    results.push({
      'email': email,
      'token': token,
      'refresh_token': refresh_token,
      'registeredAt': new Date().toISOString()
    });
    
    try {
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
      console.log('' + GREEN + BOLD + 'Account saved to ' + resultsFile + RESET);
    } catch (error) {
      console.log(RED + 'Failed to save to ' + resultsFile + ': ' + error.message + RESET);
    }
    
    successCount++;
    console.log(YELLOW + '\nProgress: ' + (i + 1) + '/' + accountCount + ' akun telah diproses. (Berhasil: ' + successCount + ', Gagal: ' + failCount + ')' + RESET);
    console.log('' + CYAN + BOLD + '═══════════════════════════════════════════════════════════════' + RESET + '\n');
    
    if (i < accountCount - 1) {
      const waitTime = Math.floor(Math.random() * (40000 - 25000) + 1) + 25000;
      await countdown(waitTime);
    }
  }
  
  console.log('' + BLUE + BOLD + '\nProses selesai.' + RESET);
}

main().catch(error => console.log(RED + 'Fatal error: ' + error.message + RESET));
