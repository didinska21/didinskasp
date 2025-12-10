// ============================================
// ASP BOT - CONFIGURATION & CONSTANTS
// ============================================

// ============================================
// CONSOLE COLORS
// ============================================
const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  BOLD: '\x1b[1m'
};

// ============================================
// SPINNER ANIMATION FRAMES
// ============================================
const SPINNER_FRAMES = [
  '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'
];

// ============================================
// API ENDPOINTS
// ============================================
const API = {
  // Base URL
  BASE_URL: 'https://dashboard.allscale.io',
  
  // Registration Endpoints
  REGISTER_OPTIONS: 'https://dashboard.allscale.io/api/public/businesses/webauthn/register/options',
  REGISTER: 'https://dashboard.allscale.io/api/public/businesses/webauthn/register',
  
  // Email Verification Endpoints
  SEND_VERIFICATION: 'https://dashboard.allscale.io/api/public/businesses/email/send-verification-code',
  VERIFY_EMAIL: 'https://dashboard.allscale.io/api/public/businesses/email/verify',
  
  // Utility Endpoints
  IP_CHECK: 'https://api.ipify.org?format=json',
  
  // Mail.tm Endpoints
  MAIL_TM_DOMAINS: 'https://api.mail.tm/domains',
  MAIL_TM_ACCOUNTS: 'https://api.mail.tm/accounts',
  MAIL_TM_TOKEN: 'https://api.mail.tm/token',
  MAIL_TM_MESSAGES: 'https://api.mail.tm/messages',
  
  // Guerrillamail Endpoints
  GUERRILLA_MAIL: 'https://api.guerrillamail.com/ajax.php'
};

// ============================================
// EMAIL PROVIDERS
// ============================================
const EMAIL_PROVIDERS = [
  'mail.tm',
  'guerrillamail'
];

// ============================================
// HTTP HEADERS CONFIGURATION
// ============================================
const HEADERS = {
  ACCEPT: '*/*',
  ACCEPT_ENCODING: 'gzip, deflate, br, zstd',
  ACCEPT_LANGUAGE: 'en-US,en;q=0.9,id;q=0.8',
  CACHE_CONTROL: 'no-cache',
  CONTENT_TYPE: 'application/json',
  ORIGIN: 'https://dashboard.allscale.io',
  PRAGMA: 'no-cache',
  PRIORITY: 'u=1, i',
  SEC_CH_UA: '"Not A(Brand";v="8", "Chromium";v="132"',
  SEC_CH_UA_MOBILE: '?0',
  SEC_CH_UA_PLATFORM: '"Windows"',
  SEC_FETCH_DEST: 'empty',
  SEC_FETCH_MODE: 'cors',
  SEC_FETCH_SITE: 'same-origin'
};

// ============================================
// WEBAUTHN CONFIGURATION
// ============================================
const WEBAUTHN = {
  TYPE: 'webauthn.create',
  ORIGIN: 'https://dashboard.allscale.io',
  CROSS_ORIGIN: false,
  PUBLIC_KEY_TYPE: 'public-key',
  NAMED_CURVE: 'P-256',
  KEY_FORMAT: 'spki',
  PRIVATE_KEY_FORMAT: 'pkcs8',
  ATTESTATION_FORMAT: 'none'
};

// ============================================
// CRYPTO CONFIGURATION
// ============================================
const CRYPTO = {
  HASH_ALGORITHM: 'sha256',
  SECRET_KEY_PREFIX: 'vT*IUEGgyL',
  AAGUID_LENGTH: 16,
  FLAGS: 0x41,
  SIGN_COUNT: 4
};

// ============================================
// DEFAULT VALUES
// ============================================
const DEFAULTS = {
  // Email
  TEMP_EMAIL_PASSWORD: 'Password123!',
  EMAIL_CHECK_ATTEMPTS: 15,
  EMAIL_CHECK_DELAY: 8000,
  
  // Registration
  DEVICE_TYPE: 1,
  
  // Proxy
  PROXY_MODE: 'Rotating',
  
  // Delays (milliseconds)
  DELAY_MIN: 25000,
  DELAY_MAX: 40000,
  
  // Files
  OUTPUT_FILE: 'registered_accounts.json',
  PROXY_FILE: 'proxy.txt'
};

// ============================================
// REGEX PATTERNS
// ============================================
const PATTERNS = {
  VERIFICATION_CODE: /verification code is (\d{6})/,
  ANSI_ESCAPE: /\x1b\[[0-9;]*m/g,
  BASE64_CLEANUP: /\+/g,
  SLASH: /\//g,
  EQUALS_END: /=+$/
};

// ============================================
// ERROR MESSAGES
// ============================================
const ERRORS = {
  NO_DOMAINS: 'Failed to fetch domains',
  NO_EMAIL: 'Failed to generate temp email',
  NO_TOKEN: 'Failed to get token',
  NO_VERIFICATION: 'No verification email received after',
  NO_PROXY: 'Tidak ada proxy yang tersisa untuk mode static',
  SERVER_ERROR: 'Server error',
  FAILED_REGISTER: 'Failed to register',
  FAILED_VERIFY: 'Failed to verify email',
  FAILED_IP: 'Failed to get IP',
  FAILED_OPTIONS: 'Failed to get options',
  FAILED_READ_PROXY: 'Gagal membaca file proxy.txt'
};

// ============================================
// SUCCESS MESSAGES
// ============================================
const SUCCESS = {
  EMAIL_GENERATED: 'Generated Temp Email',
  EMAIL_VERIFIED: 'Email verified',
  VERIFICATION_SENT: 'Verification sent',
  OPTIONS_RECEIVED: 'Options received',
  REGISTRATION_SUCCESS: 'Registration successful!',
  ACCOUNT_SAVED: 'Account saved to'
};

// ============================================
// BANNER TEXT
// ============================================
const BANNER = {
  TITLE: 'ASP BOT',
  SUBTITLE: '★ BOT AUTO REFERRAL ASP ★',
  FONT: 'block',
  ALIGN: 'center',
  COLORS_BANNER: ['cyan', 'black']
};

// ============================================
// EXPORTS
// ============================================
module.exports = {
  COLORS,
  SPINNER_FRAMES,
  API,
  EMAIL_PROVIDERS,
  HEADERS,
  WEBAUTHN,
  CRYPTO,
  DEFAULTS,
  PATTERNS,
  ERRORS,
  SUCCESS,
  BANNER
};
