const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');

const PROXY_FILE = path.join(__dirname, 'proxy.txt');
const TEST_URL = 'https://api.ipify.org?format=json';
const TIMEOUT_MS = 10000;
const MAX_CONCURRENT = 5;

// Bikin agent sesuai protocol proxy
function createAgent(proxyUrl) {
  const urlObj = new URL(proxyUrl);
  const protocol = urlObj.protocol;

  if (protocol === 'http:' || protocol === 'https:') {
    return new HttpsProxyAgent(proxyUrl);
  }

  if (protocol === 'socks5:' || protocol === 'socks4:') {
    return new SocksProxyAgent(proxyUrl);
  }

  throw new Error(`Protocol tidak didukung: ${protocol}`);
}

// Test satu proxy
async function testProxy(proxyUrl) {
  let agent;
  try {
    agent = createAgent(proxyUrl);
  } catch (err) {
    console.log(`  ⚠️  Format/protocol error: ${err.message}`);
    return false;
  }

  try {
    const res = await axios.get(TEST_URL, {
      httpAgent: agent,
      httpsAgent: agent,
      timeout: TIMEOUT_MS,
    });

    let ip = '';
    if (typeof res.data === 'string') {
      ip = res.data;
    } else if (res.data && res.data.ip) {
      ip = res.data.ip;
    }

    console.log(`  ✅ AKTIF (IP: ${ip || 'unknown'})`);
    return true;
  } catch (err) {
    console.log(`  ❌ MATI / TIMEOUT (${err.code || err.message})`);
    return false;
  }
}

// Baca semua baris file & tandai mana yang proxy
function loadFileWithProxyMap() {
  if (!fs.existsSync(PROXY_FILE)) {
    console.error(`File ${PROXY_FILE} tidak ditemukan`);
    process.exit(1);
  }

  const content = fs.readFileSync(PROXY_FILE, 'utf8');
  const lines = content.split(/\r?\n/);

  const proxyLines = []; // { lineIndex, proxy }

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Bukan proxy kalau:
    // - kosong
    // - komentar (#)
    if (!trimmed || trimmed.startsWith('#')) return;

    // Anggap baris lain sebagai kandidat proxy
    // (kalau format salah, nanti dianggap mati)
    proxyLines.push({ lineIndex: idx, proxy: trimmed });
  });

  return { lines, proxyLines };
}

// Simpan kembali file:
// - komentar & teks lain -> tetap
// - baris proxy mati -> dihapus
// - baris proxy aktif -> tetap
function saveFilteredFile(lines, aliveMap) {
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const originalLine = lines[i];
    const trimmed = originalLine.trim();

    // Komentar atau kosong -> selalu disimpan apa adanya
    if (!trimmed || trimmed.startsWith('#')) {
      newLines.push(originalLine);
      continue;
    }

    // Kalau ini baris proxy (ada di aliveMap)
    if (i in aliveMap) {
      if (aliveMap[i]) {
        // Proxy aktif -> simpan baris aslinya
        newLines.push(originalLine);
      } else {
        // Proxy mati -> SKIP (hapus)
        // (tidak push apa-apa)
      }
    } else {
      // Bukan komentar, bukan terdeteksi proxy (aneh),
      // amannya: tetap disimpan
      newLines.push(originalLine);
    }
  }

  fs.writeFileSync(PROXY_FILE, newLines.join('\n'), 'utf8');
}

async function main() {
  const { lines, proxyLines } = loadFileWithProxyMap();

  if (proxyLines.length === 0) {
    console.log('Tidak ada baris proxy yang bisa dites di proxy.txt.');
    return;
  }

  console.log(`Ditemukan ${proxyLines.length} baris proxy. Mulai test...\n`);

  // aliveMap: key = lineIndex, value = true/false (aktif/mati)
  const aliveMap = {};
  let index = 0;

  async function worker(workerId) {
    while (true) {
      const i = index++;
      if (i >= proxyLines.length) break;

      const { lineIndex, proxy } = proxyLines[i];
      console.log(`[Worker ${workerId}] Test ${i + 1}/${proxyLines.length}: ${proxy}`);
      const ok = await testProxy(proxy);
      aliveMap[lineIndex] = ok;
    }
  }

  const workers = [];
  const workerCount = Math.min(MAX_CONCURRENT, proxyLines.length);
  for (let i = 0; i < workerCount; i++) {
    workers.push(worker(i + 1));
  }

  await Promise.all(workers);

  console.log('\n==============================');
  const aktifCount = Object.values(aliveMap).filter(v => v).length;
  console.log(`Proxy aktif: ${aktifCount}/${proxyLines.length}`);
  console.log('Mengupdate proxy.txt:');
  console.log('- Komentar & keterangan: DIPERTAHANKAN');
  console.log('- Proxy mati: DIHAPUS');
  console.log('- Proxy aktif: DISIMPAN');

  saveFilteredFile(lines, aliveMap);

  console.log('Selesai. ✅');
}

main().catch(err => {
  console.error('Terjadi error:', err);
  process.exit(1);
});
