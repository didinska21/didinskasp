// ============================================
// ASP BOT - UTILITY FUNCTIONS
// ============================================

const fs = require('fs');
const crypto = require('crypto');
const cfonts = require('cfonts');
const UserAgent = require('user-agents');
const { COLORS, SPINNER_FRAMES, PATTERNS, BANNER, CRYPTO: CRYPTO_CONFIG } = require('./config');

// ============================================
// LOGGER & SPINNER UTILITIES
// ============================================

/**
 * Create animated spinner for loading states
 * @param {string} message - Message to display
 * @returns {object} Spinner controls (start, succeed, fail, stop)
 */
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
      process.stdout.write(`${COLORS.CYAN}${SPINNER_FRAMES[frameIndex]} ${message}${COLORS.RESET}`);
      intervalId = setInterval(() => {
        frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
        clearLine();
        process.stdout.write(`${COLORS.CYAN}${SPINNER_FRAMES[frameIndex]} ${message}${COLORS.RESET}`);
      }, 100);
    },

    succeed(successMessage) {
      if (!isRunning) return;
      clearInterval(intervalId);
      isRunning = false;
      clearLine();
      process.stdout.write(`${COLORS.GREEN}${COLORS.BOLD}✔ ${successMessage}${COLORS.RESET}\n`);
    },

    fail(errorMessage) {
      if (!isRunning) return;
      clearInterval(intervalId);
      isRunning = false;
      clearLine();
      process.stdout.write(`${COLORS.RED}✖ ${errorMessage}${COLORS.RESET}\n`);
    },

    stop() {
      if (!isRunning) return;
      clearInterval(intervalId);
      isRunning = false;
      clearLine();
    }
  };
}

/**
 * Center text in terminal
 * @param {string} text - Text to center
 * @returns {string} Centered text
 */
function centerText(text) {
  const terminalWidth = process.stdout.columns || 80;
  const textLength = text.replace(PATTERNS.ANSI_ESCAPE, '').length;
  const padding = Math.max(0, Math.floor((terminalWidth - textLength) / 2));
  return ' '.repeat(padding) + text;
}

/**
 * Display ASCII banner
 */
function showBanner() {
  cfonts.say(BANNER.TITLE, {
    font: BANNER.FONT,
    align: BANNER.ALIGN,
    colors: BANNER.COLORS_BANNER
  });
  
  console.log(centerText(COLORS.BLUE + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + COLORS.RESET));
  console.log(centerText(COLORS.CYAN + BANNER.SUBTITLE + COLORS.RESET + '\n'));
}

/**
 * Log success message
 * @param {string} message 
 */
function logSuccess(message) {
  console.log(`${COLORS.GREEN}${COLORS.BOLD}✔ ${message}${COLORS.RESET}`);
}

/**
 * Log error message
 * @param {string} message 
 */
function logError(message) {
  console.log(`${COLORS.RED}✖ ${message}${COLORS.RESET}`);
}

/**
 * Log info message
 * @param {string} message 
 */
function logInfo(message) {
  console.log(`${COLORS.CYAN}ℹ ${message}${COLORS.RESET}`);
}

/**
 * Log warning message
 * @param {string} message 
 */
function logWarning(message) {
  console.log(`${COLORS.YELLOW}⚠ ${message}${COLORS.RESET}`);
}

// ============================================
// DELAY UTILITIES
// ============================================

/**
 * Delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Countdown with visual timer
 * @param {number} ms - Milliseconds to countdown
 * @param {string} message - Message to display
 */
async function countdown(ms, message = 'Waiting') {
  const seconds = Math.floor(ms / 1000);
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`${COLORS.YELLOW}\r${message} ${i} seconds...${COLORS.RESET}`);
    await delay(1000);
  }
  process.stdout.write('\r' + ' '.repeat(50) + '\r');
}

// ============================================
// FILE HANDLER UTILITIES
// ============================================

/**
 * Read proxies from file
 * @param {string} filename - Proxy file path
 * @returns {Array<string>} Array of proxy URLs
 */
function readProxies(filename) {
  try {
    const content = fs.readFileSync(filename, 'utf-8');
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
  } catch (error) {
    logError(`Gagal membaca file ${filename}: ${error.message}`);
    return [];
  }
}

/**
 * Save accounts to JSON file
 * @param {Array} accounts - Array of account objects
 * @param {string} filename - Output file path
 */
function saveAccounts(accounts, filename) {
  try {
    fs.writeFileSync(filename, JSON.stringify(accounts, null, 2));
    logSuccess(`Account saved to ${filename}`);
  } catch (error) {
    logError(`Failed to save to ${filename}: ${error.message}`);
  }
}

/**
 * Load accounts from JSON file
 * @param {string} filename - Input file path
 * @returns {Array} Array of account objects
 */
function loadAccounts(filename) {
  try {
    if (fs.existsSync(filename)) {
      return JSON.parse(fs.readFileSync(filename, 'utf-8'));
    }
    return [];
  } catch (error) {
    logWarning(`Failed to load accounts: ${error.message}`);
    return [];
  }
}

// ============================================
// HTTP HEADERS UTILITIES
// ============================================

/**
 * Generate global HTTP headers
 * @param {string} url - Request URL
 * @param {string} referrer - Referrer path
 * @param {object} additionalHeaders - Additional headers to merge
 * @returns {object} Complete headers object
 */
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
    'referer': `https://dashboard.allscale.io/${referrer}`,
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': userAgent.toString()
  };

  // Add timestamp and secret-key for specific endpoints
  if (url.includes('secret-key')) {
    const timestamp = Math.floor(Date.now() / 1000);
    const secretKey = crypto
      .createHash(CRYPTO_CONFIG.HASH_ALGORITHM)
      .update(CRYPTO_CONFIG.SECRET_KEY_PREFIX + timestamp)
      .digest('hex');
    
    headers['timestamp'] = timestamp;
    headers['secret-key'] = secretKey;
  }

  return Object.assign(headers, additionalHeaders);
}

// ============================================
// RANDOM UTILITIES
// ============================================

/**
 * Get random item from array
 * @param {Array} array 
 * @returns {*} Random item
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random delay between min and max
 * @param {number} min - Minimum delay (ms)
 * @param {number} max - Maximum delay (ms)
 * @returns {number} Random delay
 */
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random string
 * @param {number} length - String length
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
  return Math.random().toString(36).substring(2, 2 + length);
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Logger & Spinner
  createSpinner,
  centerText,
  showBanner,
  logSuccess,
  logError,
  logInfo,
  logWarning,
  
  // Delay
  delay,
  countdown,
  
  // File Handler
  readProxies,
  saveAccounts,
  loadAccounts,
  
  // HTTP Headers
  getGlobalHeaders,
  
  // Random Utilities
  getRandomItem,
  getRandomDelay,
  generateRandomString
};
