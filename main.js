// ============================================
// ASP BOT - MAIN ENTRY POINT
// ============================================

require('dotenv').config();
const axios = require('axios');
const inquirer = require('inquirer');
const { COLORS, DEFAULTS } = require('./config');
const { 
  showBanner, 
  readProxies, 
  saveAccounts, 
  loadAccounts,
  countdown,
  logError,
  logInfo,
  logWarning,
  getRandomDelay
} = require('./utils');
const { doRegister, setupProxy, getIpAddress } = require('./services');

// ============================================
// CONFIGURATION LOADER
// ============================================

/**
 * Load and validate configuration from .env
 * @returns {object} Configuration object
 */
function loadConfig() {
  return {
    referralCode: process.env.REFERRAL_CODE || '',
    accountsToCreate: parseInt(process.env.ACCOUNTS_TO_CREATE) || 5,
    useProxy: process.env.USE_PROXY === 'true',
    proxyMode: process.env.PROXY_MODE || 'Rotating',
    emailProvider: process.env.EMAIL_PROVIDER || 'random',
    maxEmailCheckAttempts: parseInt(process.env.MAX_EMAIL_CHECK_ATTEMPTS) || DEFAULTS.EMAIL_CHECK_ATTEMPTS,
    emailCheckDelay: parseInt(process.env.EMAIL_CHECK_DELAY) || DEFAULTS.EMAIL_CHECK_DELAY,
    delayMin: parseInt(process.env.DELAY_MIN) || DEFAULTS.DELAY_MIN,
    delayMax: parseInt(process.env.DELAY_MAX) || DEFAULTS.DELAY_MAX,
    outputFile: process.env.OUTPUT_FILE || DEFAULTS.OUTPUT_FILE,
    proxyFile: process.env.PROXY_FILE || DEFAULTS.PROXY_FILE,
    debug: process.env.DEBUG === 'true',
    autoRetry: process.env.AUTO_RETRY === 'true',
    maxRetries: parseInt(process.env.MAX_RETRIES) || 3
  };
}

// ============================================
// INTERACTIVE PROMPTS
// ============================================

/**
 * Ask user for referral code if not in .env
 * @returns {Promise<string>} Referral code
 */
async function askReferralCode() {
  const { referralCode } = await inquirer.prompt([{
    type: 'input',
    name: 'referralCode',
    message: `${COLORS.CYAN}Masukkan kode referral:${COLORS.RESET}`,
    validate: input => input.trim() !== '' ? true : 'Referral code tidak boleh kosong!'
  }]);
  return referralCode.trim();
}

/**
 * Ask user for number of accounts
 * @returns {Promise<number>} Number of accounts
 */
async function askAccountCount() {
  const { count } = await inquirer.prompt([{
    type: 'input',
    name: 'count',
    message: `${COLORS.CYAN}Berapa banyak akun yang ingin Anda buat?${COLORS.RESET}`,
    validate: input => {
      const num = parseInt(input, 10);
      return !isNaN(num) && num > 0 ? true : `${COLORS.RED}Masukkan angka yang valid!${COLORS.RESET}`;
    }
  }]);
  return parseInt(count, 10);
}

/**
 * Ask user if they want to use proxy
 * @returns {Promise<boolean>} Use proxy or not
 */
async function askUseProxy() {
  const { useProxy } = await inquirer.prompt([{
    type: 'confirm',
    name: 'useProxy',
    message: `${COLORS.CYAN}Apakah Anda ingin menggunakan proxy?${COLORS.RESET}`,
    default: false
  }]);
  return useProxy;
}

/**
 * Ask user for proxy mode
 * @returns {Promise<string>} Proxy mode (Rotating or Static)
 */
async function askProxyMode() {
  const { proxyMode } = await inquirer.prompt([{
    type: 'list',
    name: 'proxyMode',
    message: `${COLORS.CYAN}Pilih mode proxy:${COLORS.RESET}`,
    choices: ['Rotating', 'Static']
  }]);
  return proxyMode;
}

// ============================================
// PROXY HANDLER
// ============================================

/**
 * Get next proxy based on mode
 * @param {Array} proxies - Proxy list
 * @param {string} mode - Proxy mode (Rotating or Static)
 * @param {number} index - Current index (for rotating)
 * @returns {string|null} Proxy URL or null
 */
function getNextProxy(proxies, mode, index) {
  if (proxies.length === 0) return null;
  
  if (mode === 'Static') {
    // Random one proxy for all accounts
    return proxies[Math.floor(Math.random() * proxies.length)];
  } else {
    // Rotating: use different proxy for each account
    return proxies[index % proxies.length];
  }
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  try {
    // Show banner
    showBanner();
    
    // Load config from .env
    let config = loadConfig();
    
    // Interactive prompts if config is empty
    if (!config.referralCode) {
      config.referralCode = await askReferralCode();
    }
    
    if (!config.accountsToCreate || config.accountsToCreate <= 0) {
      config.accountsToCreate = await askAccountCount();
    }
    
    // Ask about proxy if not set in .env
    if (process.env.USE_PROXY === undefined) {
      config.useProxy = await askUseProxy();
      
      if (config.useProxy) {
        config.proxyMode = await askProxyMode();
      }
    }
    
    // Load proxies if needed
    let proxies = [];
    let staticProxy = null;
    
    if (config.useProxy) {
      proxies = readProxies(config.proxyFile);
      
      if (proxies.length === 0) {
        logWarning(`No proxies found in ${config.proxyFile}`);
        config.useProxy = false;
      } else {
        logInfo(`Loaded ${proxies.length} proxies from ${config.proxyFile}`);
        
        // For static mode, select one proxy upfront
        if (config.proxyMode === 'Static') {
          staticProxy = getNextProxy(proxies, 'Static', 0);
          logInfo(`Static mode: Using proxy ${staticProxy} for all accounts`);
        }
      }
    }
    
    // Display configuration
    console.log(`${COLORS.YELLOW}═══════════════════════════════════════════════════════════════${COLORS.RESET}`);
    console.log(`${COLORS.YELLOW}${COLORS.BOLD}Creating ${config.accountsToCreate} accounts${COLORS.RESET}`);
    console.log(`${COLORS.YELLOW}═══════════════════════════════════════════════════════════════${COLORS.RESET}`);
    console.log(`${COLORS.YELLOW}⚠ Harap tunggu, proses mungkin memakan waktu...${COLORS.RESET}\n`);
    
    // Load existing accounts
    let results = loadAccounts(config.outputFile);
    let successCount = 0;
    let failCount = 0;
    
    // Main registration loop
    for (let i = 0; i < config.accountsToCreate; i++) {
      console.log(`${COLORS.CYAN}${COLORS.BOLD}\n═══════════════════════════════ ACCOUNT ${i + 1}/${config.accountsToCreate} ═══════════════════════════════${COLORS.RESET}`);
      
      // Setup axios instance (with or without proxy)
      let axiosInstance;
      let currentProxy = null;
      
      if (config.useProxy) {
        if (config.proxyMode === 'Static') {
          currentProxy = staticProxy;
        } else {
          currentProxy = getNextProxy(proxies, 'Rotating', i);
        }
        
        if (!currentProxy) {
          logError('No proxy available!');
          process.exit(1);
        }
        
        console.log(`${COLORS.WHITE}Menggunakan proxy: ${currentProxy}${COLORS.RESET}`);
        axiosInstance = setupProxy(currentProxy);
      } else {
        axiosInstance = axios.create();
      }
      
      // Show current IP
      const currentIp = await getIpAddress(axiosInstance);
      console.log(`${COLORS.WHITE}Current IP: ${currentIp}${COLORS.RESET}\n`);
      
      // Attempt registration
      let attempts = 0;
      let success = false;
      let accountData = null;
      
      while (attempts < (config.autoRetry ? config.maxRetries : 1)) {
        attempts++;
        
        if (attempts > 1) {
          logInfo(`Retry attempt ${attempts}/${config.maxRetries}...`);
        }
        
        const result = await doRegister(
          axiosInstance,
          config.referralCode,
          `account_${i + 1}`
        );
        
        if (result.success) {
          success = true;
          accountData = result;
          break;
        }
        
        if (attempts < config.maxRetries && config.autoRetry) {
          logWarning('Registration failed, retrying...');
          await countdown(5000, 'Waiting before retry');
        }
      }
      
      // Handle result
      if (success && accountData) {
        successCount++;
        
        // Save account
        results.push({
          email: accountData.email,
          token: accountData.token,
          refresh_token: accountData.refresh_token,
          registeredAt: new Date().toISOString()
        });
        
        saveAccounts(results, config.outputFile);
      } else {
        failCount++;
      }
      
      // Progress
      console.log(`${COLORS.YELLOW}\nProgress: ${i + 1}/${config.accountsToCreate} akun telah diproses. (Berhasil: ${successCount}, Gagal: ${failCount})${COLORS.RESET}`);
      console.log(`${COLORS.CYAN}${COLORS.BOLD}═══════════════════════════════════════════════════════════════${COLORS.RESET}\n`);
      
      // Delay before next account (except last one)
      if (i < config.accountsToCreate - 1) {
        const waitTime = getRandomDelay(config.delayMin, config.delayMax);
        await countdown(waitTime, 'Waiting before next account');
      }
    }
    
    // Final summary
    console.log(`${COLORS.BLUE}${COLORS.BOLD}\n═══════════════════════════════════════════════════════════════${COLORS.RESET}`);
    console.log(`${COLORS.BLUE}${COLORS.BOLD}Proses selesai!${COLORS.RESET}`);
    console.log(`${COLORS.GREEN}✔ Berhasil: ${successCount} akun${COLORS.RESET}`);
    console.log(`${COLORS.RED}✖ Gagal: ${failCount} akun${COLORS.RESET}`);
    console.log(`${COLORS.CYAN}📁 File output: ${config.outputFile}${COLORS.RESET}`);
    console.log(`${COLORS.BLUE}${COLORS.BOLD}═══════════════════════════════════════════════════════════════${COLORS.RESET}\n`);
    
  } catch (error) {
    logError(`Fatal error: ${error.message}`);
    if (loadConfig().debug) {
      console.error(error);
    }
    process.exit(1);
  }
}

// ============================================
// RUN
// ============================================

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  logError(`Unhandled rejection: ${error.message}`);
  process.exit(1);
});

// Run main
main().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
});
