# AllScale Auto Referral Bot - Complete Documentation

## 📋 Overview
Bot otomatis untuk membuat akun referral di platform AllScale menggunakan:
- Temporary email services (Mail.tm & Guerrillamail)
- WebAuthn credential generation
- Proxy support (Rotating/Static)
- Auto email verification

---

## 📦 Dependencies Required

```bash
npm install inquirer axios https-proxy-agent cfonts user-agents uuid cbor
```

### Package List:
- **inquirer**: Interactive CLI prompts
- **axios**: HTTP client
- **https-proxy-agent**: Proxy support
- **cfonts**: ASCII art banner
- **user-agents**: Random user agent generator
- **uuid**: Generate unique device IDs
- **cbor**: CBOR encoding for WebAuthn

---

## 📁 File Structure

```
project/
├── script.js           # Main script (gabungan Part 1-8)
├── proxy.txt          # Proxy list (optional)
├── account.json       # Output saved accounts
└── package.json       # Dependencies
```

---

## ⚙️ Configuration Files

### proxy.txt Format:
```
http://username:password@proxy1.com:8080
http://username:password@proxy2.com:8080
socks5://proxy3.com:1080
```

### account.json Output:
```json
[
  {
    "email": "random123@mail.tm",
    "token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "registeredAt": "2025-01-01T12:00:00.000Z"
  }
]
```

---

## 🚀 How to Use

### 1. Installation
```bash
# Clone atau download script
npm install

# Siapkan file proxy.txt (optional)
touch proxy.txt
```

### 2. Running the Script
```bash
node script.js
```

### 3. Interactive Prompts
```
? Apakah Anda ingin menggunakan proxy? (y/N)
? Pilih tipe proxy: (Rotating/Static)
? Masukkan jumlah akun yang ingin dibuat: 10
? Masukkan kode referral: YOUR_REFERRAL_CODE
```

---

## 🔄 Process Flow

```mermaid
graph TD
    A[Start] --> B[Setup Proxy?]
    B -->|Yes| C[Load proxy.txt]
    B -->|No| D[Direct Connection]
    C --> E[Input Config]
    D --> E
    E --> F[Loop: Create Accounts]
    F --> G[Get IP Address]
    G --> H[Create Temp Email]
    H --> I[Generate WebAuthn Credential]
    I --> J[Register Account]
    J --> K[Send Verification Email]
    K --> L[Check Inbox for Code]
    L --> M[Verify Email]
    M --> N[Save to account.json]
    N --> O{More accounts?}
    O -->|Yes| P[Wait 25-40s]
    P --> F
    O -->|No| Q[Complete]
```

---

## 🔑 Key Features

### 1. **Temporary Email Services**
- **Mail.tm**: API-based, reliable
- **Guerrillamail**: Fallback option
- Auto-random selection

### 2. **WebAuthn Credential Generation**
- Generate EC P-256 key pairs
- CBOR encoding
- Attestation format: "none"
- Compliant with WebAuthn standard

### 3. **Proxy Support**
- **Rotating**: Random proxy per account
- **Static**: Sequential proxy usage
- Auto IP detection

### 4. **Email Verification**
- Auto polling inbox (15 attempts, 2s delay)
- Regex extraction of 6-digit code
- Auto verification submission

### 5. **Progress Tracking**
- Real-time success/fail counter
- Save progress to JSON
- Colorful CLI output

---

## 🎨 CLI Output Example

```
     █████╗ ██╗     ██╗     ███████╗ ██████╗ █████╗ ██╗     ███████╗
    ██╔══██╗██║     ██║     ██╔════╝██╔════╝██╔══██╗██║     ██╔════╝
    ███████║██║     ██║     ███████╗██║     ███████║██║     █████╗  
    ██╔══██║██║     ██║     ╚════██║██║     ██╔══██║██║     ██╔══╝  
    ██║  ██║███████╗███████╗███████║╚██████╗██║  ██║███████╗███████╗
    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝

              ☆ Telegram Channel: @airdropwithmeh ☆
                  ☆ BOT AUTO REFERRAL ASP ☆

═══════════════════════════════════════════════════════════
🚀 Memulai proses pembuatan 10 Akun ..
═══════════════════════════════════════════════════════════
📌 Referral Code: ABC123

═══════════════ Akun 1/10 ═══════════════════════════════
🔄 Menggunakan proxy: http://proxy1.com:8080
🌍 IP Address: 192.168.1.1

📧 Email: random123@mail.tm
✔ Akun berhasil didaftarkan!
✔ Kode verifikasi berhasil dikirim
✔ Email berhasil diverifikasi
💾 Akun tersimpan di account.json

📊 Progress: Akun 1/10 (Berhasil: 1, Gagal: 0)
════════════════════════════════════════════════════════════

⏳ Tunggu 32 detik...
```

---

## ⚠️ Important Notes

### Security Considerations:
1. **Rate Limiting**: Bot uses 25-40s delay between accounts
2. **IP Rotation**: Use proxy to avoid IP blocks
3. **Random User-Agent**: Auto-generated per account
4. **WebAuthn**: Generates unique credentials per account

### Limitations:
1. Depends on temporary email service availability
2. AllScale API may change (require updates)
3. Success rate depends on proxy quality
4. Email verification timeout: 30 seconds (15 attempts × 2s)

### Error Handling:
- Auto-retry for failed accounts
- Continue on single account failure
- Save progress incrementally
- Detailed error logging

---

## 🛠️ Troubleshooting

### Issue: No emails received
**Solution**: 
- Wait longer (increase maxAttempts in checkInbox)
- Try different email provider
- Check internet connection

### Issue: Registration fails
**Solution**:
- Verify referral code is correct
- Check if IP/proxy is not blocked
- Ensure AllScale API is accessible

### Issue: Proxy not working
**Solution**:
- Test proxy manually
- Verify proxy.txt format
- Try different proxy type (HTTP/SOCKS5)

---

## 📊 Success Rate Factors

| Factor | Impact | Solution |
|--------|--------|----------|
| Proxy Quality | High | Use premium proxies |
| Email Service | Medium | Use both providers |
| Delay Timing | Low | Keep 25-40s range |
| API Changes | Critical | Update script regularly |

---

## 🔐 Legal Disclaimer

This script is for **educational purposes only**. 

⚠️ **Warning**: 
- Auto-registration may violate platform Terms of Service
- Use at your own risk
- Author is not responsible for misuse
- Respect platform rate limits and rules

---

## 📝 License

MIT License - Free to use and modify

---

## 👨‍💻 Support

- Telegram: @airdropwithmeh
- Issues: Check console logs for errors
- Updates: Monitor for AllScale API changes

---

## 🎯 Future Improvements

- [ ] Add CAPTCHA solver integration
- [ ] Support more email providers
- [ ] GUI interface option
- [ ] Database storage instead of JSON
- [ ] Multi-threading support
- [ ] Advanced proxy rotation algorithms
- [ ] Detailed analytics dashboard

---

## 📈 Performance Stats

Average per account:
- Registration time: 30-60 seconds
- Success rate: 70-90% (with good proxies)
- Memory usage: ~50MB per account
- Network usage: ~2-5MB per account
