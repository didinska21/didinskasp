// ============================================
// ASP BOT - ALL SERVICES
// ============================================

const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const cbor = require('cbor');
const UserAgent = require('user-agents');
const { HttpsProxyAgent } = require('https-proxy-agent');
const inquirer = require('inquirer');
const zlib = require('zlib');  // ← Tambahkan ini di baris paling atas

const { 
  API, 
  EMAIL_PROVIDERS, 
  DEFAULTS, 
  PATTERNS, 
  ERRORS, 
  SUCCESS,
  COLORS,
  WEBAUTHN,
  CRYPTO: CRYPTO_CONFIG
} = require('./config');

const { 
  createSpinner, 
  delay, 
  getGlobalHeaders,
  logError,
  logSuccess,
  getRandomItem,
  generateRandomString
} = require('./utils');

// ============================================
// PROXY SERVICE
// ============================================

/**
 * Get current IP address
 * @param {object} axiosInstance - Axios instance (with/without proxy)
 * @returns {Promise<string>} IP address
 */
async function getIpAddress(axiosInstance) {
  try {
    const response = await axiosInstance.get(API.IP_CHECK);
    return response.data.ip;
  } catch (error) {
    logError(`Failed to get IP: ${error.message}`);
    return 'unknown';
  }
}

/**
 * Setup axios instance with proxy
 * @param {string} proxy - Proxy URL
 * @returns {object} Axios instance with proxy
 */
function setupProxy(proxy) {
  const proxyAgent = new HttpsProxyAgent(proxy);
  return axios.create({
    httpAgent: proxyAgent,
    httpsAgent: proxyAgent
  });
}

// ============================================
// EMAIL SERVICE
// ============================================

/**
 * Get temporary email from mail.tm or guerrillamail
 * @param {string} provider - Email provider ('mail.tm' or 'guerrillamail')
 * @param {object} axiosInstance - Axios instance
 * @param {string} ipAddress - Current IP address
 * @param {string} userAgent - User agent string
 * @returns {Promise<object|null>} Email data or null
 */
async function getTempEmail(provider, axiosInstance, ipAddress, userAgent) {
  if (provider === 'mail.tm') {
    try {
      let domains = [];
      let page = 1;
      
      // Fetch all active domains
      while (true) {
        const url = `${API.MAIL_TM_DOMAINS}?page=${page}`;
        const response = await axios.get(url);
        
        if (response.status !== 200) {
          throw new Error(ERRORS.NO_DOMAINS);
        }
        
        const data = response.data;
        const allDomains = data['hydra:member'] || [];
        const activeDomains = allDomains.filter(domain => domain.isActive && !domain.isPrivate);
        domains = domains.concat(activeDomains);
        
        if (!data['hydra:view'] || !data['hydra:view']['hydra:next']) break;
        page++;
      }
      
      if (domains.length === 0) {
        throw new Error(ERRORS.NO_DOMAINS);
      }
      
      // Generate email
      const selectedDomain = getRandomItem(domains);
      const domainName = selectedDomain.domain;
      const username = generateRandomString(13);
      const email = `${username}@${domainName}`;
      const password = DEFAULTS.TEMP_EMAIL_PASSWORD;
      
      // Register email
      const registerData = {
        address: email,
        password: password
      };
      
      const registerResponse = await axios.post(API.MAIL_TM_ACCOUNTS, registerData);
      
      if (registerResponse.status === 201) {
        console.log(`${COLORS.GREEN}Generated Temp Email : ${email}${COLORS.RESET}`);
        return {
          provider: 'mail.tm',
          address: email,
          password: password,
          login: username,
          domain: domainName
        };
      } else {
        throw new Error(ERRORS.NO_EMAIL);
      }
    } catch (error) {
      logError(`Failed to generate temp email : ${error.message}`);
      return null;
    }
  } 
  
  else if (provider === 'guerrillamail') {
    const params = {
      f: 'get_email_address',
      lang: 'en',
      ip: ipAddress,
      agent: userAgent
    };
    
    try {
      const response = await axiosInstance.get(API.GUERRILLA_MAIL, { params });
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
      
      console.log(`${COLORS.GREEN}Generated Temp Email : ${email}${COLORS.RESET}`);
      return {
        provider: 'guerrillamail',
        address: email,
        sid_token: sidToken,
        phpsessid: phpsessid
      };
    } catch (error) {
      logError(`Failed to generate temp email : ${error.message}`);
      return null;
    }
  }
  
  return null;
}

/**
 * Get mail.tm authentication token
 * @param {object} axiosInstance - Axios instance
 * @param {string} email - Email address
 * @param {string} password - Email password
 * @returns {Promise<string|null>} Auth token or null
 */
async function getMailTmToken(axiosInstance, email, password) {
  const data = {
    address: email,
    password: password
  };
  
  try {
    const response = await axios.post(API.MAIL_TM_TOKEN, data);
    return response.data.token;
  } catch (error) {
    logError(`Failed to get token : ${error.message}`);
    return null;
  }
}

/**
 * Check inbox for verification code
 * @param {string} provider - Email provider
 * @param {object} axiosInstance - Axios instance
 * @param {object} emailData - Email data object
 * @param {number} maxAttempts - Max check attempts
 * @param {number} delayMs - Delay between checks
 * @returns {Promise<string|null>} Verification code or null
 */
async function checkInbox(provider, axiosInstance, emailData, maxAttempts = 15, delayMs = 8000) {
  if (provider === 'mail.tm') {
    const token = await getMailTmToken(axiosInstance, emailData.address, emailData.password);
    if (!token) return null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await axios.get(API.MAIL_TM_MESSAGES, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const messages = response.data['hydra:member'];
        
        if (messages.length > 0) {
          const messageId = messages[0].id;
          const messageUrl = `${API.MAIL_TM_MESSAGES}/${messageId}`;
          const messageResponse = await axios.get(messageUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const messageText = messageResponse.data.text || messageResponse.data.html;
          const codeMatch = messageText.match(PATTERNS.VERIFICATION_CODE);
          
          if (codeMatch) return codeMatch[1];
        }
      } catch (error) {
        console.log(`${COLORS.YELLOW}Attempt ${attempt}: No email yet - ${error.message}${COLORS.RESET}`);
      }
      
      await delay(delayMs);
    }
    
    logError(`${ERRORS.NO_VERIFICATION} ${maxAttempts} attempts`);
    return null;
  } 
  
  else if (provider === 'guerrillamail') {
    const sidToken = emailData.sid_token;
    const phpsessid = emailData.phpsessid;
    const cookieHeaders = {
      'Cookie': `PHPSESSID=${phpsessid}`
    };
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const params = {
        f: 'check_email',
        seq: 0
      };
      
      try {
        const response = await axiosInstance.get(API.GUERRILLA_MAIL, {
          params,
          headers: cookieHeaders
        });
        
        const emails = response.data.list || [];
        
        if (emails.length > 0) {
          const firstEmail = emails[0];
          const fetchParams = {
            f: 'fetch_email',
            email_id: firstEmail.mail_id
          };
          
          const fetchResponse = await axiosInstance.get(API.GUERRILLA_MAIL, {
            params: fetchParams,
            headers: cookieHeaders
          });
          
          const mailBody = fetchResponse.data.mail_body || '';
          const codeMatch = mailBody.match(PATTERNS.VERIFICATION_CODE);
          
          if (codeMatch) return codeMatch[1];
        }
      } catch (error) {
        console.log(`${COLORS.YELLOW}Attempt ${attempt}: No email yet - ${error.message}${COLORS.RESET}`);
      }
      
      await delay(delayMs);
    }
    
    logError(`${ERRORS.NO_VERIFICATION} ${maxAttempts} attempts`);
    return null;
  }
  
  return null;
}

// ============================================
// AUTH SERVICE
// ============================================

/**
 * Send verification email
 * @param {object} axiosInstance - Axios instance
 * @param {string} email - Email address
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} Success status
 */
async function sendVerification(axiosInstance, email, token) {
  const data = { email };
  const headers = {
    ...getGlobalHeaders(API.SEND_VERIFICATION, ''),
    'authorization': `Bearer ${token}`,
    'referer': 'https://dashboard.allscale.io/auth/register'
  };
  
  const spinner = createSpinner('Sending verification email...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(API.SEND_VERIFICATION, data, { headers });
    
    if (response.data.code === 0) {
      spinner.succeed(SUCCESS.VERIFICATION_SENT);
      return true;
    } else {
      throw new Error(`${ERRORS.SERVER_ERROR}: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const errorMessage = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    spinner.fail(`Failed to send verification: ${errorMessage}`);
    return false;
  }
}

/**
 * Verify email with code
 * @param {object} axiosInstance - Axios instance
 * @param {string} email - Email address
 * @param {string} code - Verification code
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} Success status
 */
async function verifyEmail(axiosInstance, email, code, token) {
  const data = { email, code };
  const headers = {
    ...getGlobalHeaders(API.VERIFY_EMAIL, ''),
    'authorization': `Bearer ${token}`,
    'referer': 'https://dashboard.allscale.io/auth/register'
  };
  
  const spinner = createSpinner('Verifying email...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(API.VERIFY_EMAIL, data, { headers });
    
    if (response.data.code === 0) {
      spinner.succeed(SUCCESS.EMAIL_VERIFIED);
      return true;
    } else {
      throw new Error(`${ERRORS.SERVER_ERROR}: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const errorMessage = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    spinner.fail(`Failed to verify email: ${errorMessage}`);
    return false;
  }
}

/**
 * Get WebAuthn registration options (FIXED FOR CBOR - FINAL VERSION)
 * @param {object} axiosInstance - Axios instance
 * @param {string} email - Email address
 * @param {string} referrer - Referrer code
 * @returns {Promise<object|null>} Options data or null
 */
async function getOptions(axiosInstance, email, referrer) {
  const data = {
    email: email,
    type: 0
  };
  
  const spinner = createSpinner('Getting options...');
  spinner.start();
  
  try {
    // CRITICAL FIX: Handle CBOR binary response
    const response = await axiosInstance.post(API.REGISTER_OPTIONS, data, {
      headers: getGlobalHeaders(API.REGISTER_OPTIONS, referrer),
      responseType: 'arraybuffer',  // Receive as binary
      transformResponse: [],         // Disable auto-parsing
      decompress: true               // Enable decompression
    });
    
    let decodedData;
    
    // Method 1: Try CBOR decode
    try {
      const buffer = Buffer.from(response.data);
      decodedData = cbor.decodeFirstSync(buffer);
      console.log(`${COLORS.CYAN}[DEBUG] Decoded as CBOR successfully${COLORS.RESET}`);
    } catch (cborError) {
      console.log(`${COLORS.YELLOW}[DEBUG] CBOR decode failed, trying JSON...${COLORS.RESET}`);
      
      // Method 2: Try JSON decode
      try {
        const textData = Buffer.from(response.data).toString('utf-8');
        decodedData = JSON.parse(textData);
        console.log(`${COLORS.CYAN}[DEBUG] Decoded as JSON successfully${COLORS.RESET}`);
      } catch (jsonError) {
        // Method 3: Log raw data for debugging
        const rawHex = Buffer.from(response.data).toString('hex').substring(0, 100);
        console.log(`${COLORS.RED}[DEBUG] Failed to decode. First 50 bytes (hex): ${rawHex}${COLORS.RESET}`);
        
        // Try to decode as gzip
        try {
          const zlib = require('zlib');
          const decompressed = zlib.gunzipSync(Buffer.from(response.data));
          const decompressedText = decompressed.toString('utf-8');
          decodedData = JSON.parse(decompressedText);
          console.log(`${COLORS.CYAN}[DEBUG] Decoded as GZIP+JSON successfully${COLORS.RESET}`);
        } catch (gzipError) {
          logError('Failed to parse response as CBOR, JSON, or GZIP');
          logError(`CBOR Error: ${cborError.message}`);
          logError(`JSON Error: ${jsonError.message}`);
          throw new Error('Unable to decode server response');
        }
      }
    }
    
    if (decodedData && decodedData.code === 0) {
      spinner.succeed(SUCCESS.OPTIONS_RECEIVED);
      return decodedData.data;
    } else {
      throw new Error(`${ERRORS.SERVER_ERROR}: ${JSON.stringify(decodedData)}`);
    }
  } catch (error) {
    let errorMessage;
    
    if (error.response) {
      try {
        // Try to decode error response too
        const errorBuffer = Buffer.from(error.response.data);
        const errorDecoded = cbor.decodeFirstSync(errorBuffer);
        errorMessage = JSON.stringify(errorDecoded);
      } catch {
        try {
          const errorText = Buffer.from(error.response.data).toString('utf-8');
          errorMessage = errorText;
        } catch {
          errorMessage = error.message;
        }
      }
    } else {
      errorMessage = error.message;
    }
    
    spinner.fail(`${ERRORS.FAILED_OPTIONS}: ${errorMessage}`);
    return null;
  }
  }

/**
 * Generate WebAuthn credential
 * @param {object} options - WebAuthn options
 * @returns {Promise<object>} Credential object
 */
async function generateCredential(options) {
  const challenge = options.challenge;
  const rpId = options.rp.id;
  const origin = WEBAUTHN.ORIGIN;
  
  const clientData = {
    type: WEBAUTHN.TYPE,
    challenge: challenge,
    origin: origin,
    crossOrigin: WEBAUTHN.CROSS_ORIGIN
  };
  
  const clientDataBuffer = Buffer.from(JSON.stringify(clientData));
  const clientDataJSON = clientDataBuffer.toString('base64');
  
  // Generate EC key pair
  const keyPair = await new Promise((resolve, reject) => {
    crypto.generateKeyPair('ec', {
      namedCurve: WEBAUTHN.NAMED_CURVE
    }, (err, publicKey, privateKey) => {
      if (err) reject(err);
      else resolve({ publicKey, privateKey });
    });
  });
  
  // Export public key
  const publicKeyRaw = keyPair.publicKey.export({
    type: WEBAUTHN.KEY_FORMAT,
    format: 'der'
  });
  
  const rawKeyData = publicKeyRaw.slice(26);
  const xCoord = rawKeyData.slice(1, 33);
  const yCoord = rawKeyData.slice(33);
  
  // Create CBOR credential public key
  const credentialPublicKey = new Map();
  credentialPublicKey.set(1, 2);
  credentialPublicKey.set(3, -7);
  credentialPublicKey.set(-1, 1);
  credentialPublicKey.set(-2, xCoord);
  credentialPublicKey.set(-3, yCoord);
  
  const credentialPublicKeyCbor = cbor.encode(credentialPublicKey);
  const aaguid = crypto.randomBytes(CRYPTO_CONFIG.AAGUID_LENGTH);
  const aaguidStr = aaguid.toString('base64');
  
  // Build authenticator data
  const rpIdHash = crypto.createHash(CRYPTO_CONFIG.HASH_ALGORITHM).update(rpId).digest();
  const flags = CRYPTO_CONFIG.FLAGS;
  const signCount = Buffer.alloc(CRYPTO_CONFIG.SIGN_COUNT, 0);
  
  const rpIdHashPlaceholder = Buffer.alloc(16, 0);
  const credIdLen = Buffer.alloc(2);
  credIdLen.writeUInt16BE(aaguid.length, 0);
  
  const authData = Buffer.concat([rpIdHashPlaceholder, credIdLen, aaguid, credentialPublicKeyCbor]);
  const authenticatorData = Buffer.concat([rpIdHash, Buffer.from([flags]), signCount, authData]);
  
  // Create attestation object
  const attestationObject = new Map();
  attestationObject.set('fmt', WEBAUTHN.ATTESTATION_FORMAT);
  attestationObject.set('attStmt', new Map());
  attestationObject.set('authData', authenticatorData);
  
  const attestationObjectCbor = cbor.encode(attestationObject);
  const attestationObjectBase64 = attestationObjectCbor.toString('base64');
  const credentialId = aaguidStr
    .replace(PATTERNS.BASE64_CLEANUP, '-')
    .replace(PATTERNS.SLASH, '_')
    .replace(PATTERNS.EQUALS_END, '');
  
  return {
    id: credentialId,
    type: WEBAUTHN.PUBLIC_KEY_TYPE,
    rawId: Buffer.from(aaguid).toString('base64'),
    response: {
      clientDataJSON: clientDataJSON,
      attestationObject: attestationObjectBase64
    }
  };
}

/**
 * Register new account
 * @param {object} axiosInstance - Axios instance
 * @param {string} email - Email address
 * @param {string} username - Username (can be null)
 * @param {string} referrer - Referrer code
 * @param {string} userAgent - User agent string
 * @param {string} ipAddress - IP address
 * @returns {Promise<object>} Result object
 */
async function registerAccount(axiosInstance, email, username, referrer, userAgent, ipAddress) {
  const optionsData = await getOptions(axiosInstance, email, referrer);
  if (!optionsData) return { success: false };
  
  const credential = await generateCredential(optionsData.options);
  
  const data = {
    credential_json: credential,
    email: email,
    user_id: optionsData.user_id,
    referer_id: referrer,
    device_id_str: uuidv4(),
    device_type: DEFAULTS.DEVICE_TYPE,
    ip_address: ipAddress,
    user_agent: userAgent
  };
  
  const spinner = createSpinner('Registering account...');
  spinner.start();
  
  try {
    const response = await axiosInstance.post(API.REGISTER, data, {
      headers: getGlobalHeaders(API.REGISTER, referrer)
    });
    
    if (response.data.code === 0) {
      spinner.succeed(SUCCESS.REGISTRATION_SUCCESS);
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error(`${ERRORS.SERVER_ERROR}: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const errorMessage = error.response 
      ? JSON.stringify(error.response.data) 
      : error.message;
    spinner.fail(`${ERRORS.FAILED_REGISTER}: ${errorMessage}`);
    return { success: false };
  }
}

// ============================================
// MAIN REGISTRATION ORCHESTRATOR
// ============================================

/**
 * Complete registration flow
 * @param {object} axiosInstance - Axios instance
 * @param {string} referralCode - Referral code
 * @param {string} accountLabel - Account label for logging
 * @returns {Promise<object>} Result object
 */
async function doRegister(axiosInstance, referralCode, accountLabel) {
  const userAgent = new UserAgent().toString();
  const ipAddress = await getIpAddress(axiosInstance);
  
  // Get temp email
  const provider = getRandomItem(EMAIL_PROVIDERS);
  const tempEmail = await getTempEmail(provider, axiosInstance, ipAddress, userAgent);
  
  if (!tempEmail) return { success: false };
  
  const email = tempEmail.address;
  console.log(`${COLORS.GREEN}${COLORS.BOLD}Using email: ${email}${COLORS.RESET}`);
  
  // Register account
  const { success: regSuccess, data: regData } = await registerAccount(
    axiosInstance,
    email,
    null,
    referralCode,
    userAgent,
    ipAddress
  );
  
  if (!regSuccess) return { success: false };
  
  // Send verification
  const verifSent = await sendVerification(axiosInstance, email, regData.token);
  if (!verifSent) return { success: false };
  
  // Check inbox
  const verifCode = await checkInbox(provider, axiosInstance, tempEmail);
  
  if (!verifCode) {
    // Manual input fallback
    const { verifCode: manualCode } = await inquirer.prompt([{
      type: 'input',
      name: 'verifCode',
      message: `${COLORS.CYAN}Enter verification code manually: ${COLORS.RESET}`
    }]);
    
    if (manualCode) {
      const verified = await verifyEmail(axiosInstance, email, manualCode, regData.token);
      if (verified) {
        return {
          success: true,
          email: email,
          token: regData.token,
          refresh_token: regData.refresh_token
        };
      }
    }
    
    return { success: false };
  }
  
  // Verify email
  const verified = await verifyEmail(axiosInstance, email, verifCode, regData.token);
  if (!verified) return { success: false };
  
  return {
    success: true,
    email: email,
    token: regData.token,
    refresh_token: regData.refresh_token
  };
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Proxy
  getIpAddress,
  setupProxy,
  
  // Email
  getTempEmail,
  getMailTmToken,
  checkInbox,
  
  // Auth
  sendVerification,
  verifyEmail,
  
  // Registration
  getOptions,
  generateCredential,
  registerAccount,
  
  // Main Orchestrator
  doRegister
};
