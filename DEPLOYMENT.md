# Web Sitesini Yayınlama ve Domain Bağlama Rehberi

Web sitenizi **minimizepdf.com** adresinde yayınlamak için GitHub Pages kullanılmaktadır. Proje, kodlar GitHub'a yüklendiğinde otomatik olarak yayınlanacak şekilde yapılandırılmıştır.

## GitHub Pages ile Otomatik Yayınlama

Bu proje için **GitHub Actions** kurulumu yapılmıştır. Kodlarınızı `main` dalına (branch) gönderdiğinizde (push), sistem otomatik olarak projeyi derler ve yayınlar.

### Nasıl Çalışır?
1. Kod değişikliklerinizi yapın ve `main` dalına gönderin (push).
2. GitHub Actions otomatik olarak çalışır (`.github/workflows/deploy.yml`).
3. Proje derlenir (`npm run build`) ve oluşturulan dosyalar `gh-pages` dalına yüklenir.
4. GitHub Pages ayarlarından kaynak olarak `gh-pages` seçili olduğu sürece siteniz güncellenir.

### Domain ve DNS Ayarları
Proje içerisinde `public/CNAME` dosyası mevcuttur ve içeriği `minimizepdf.com` olarak ayarlanmıştır.

Eğer domain ayarlarını henüz yapmadıysanız, domain sağlayıcınızın (GoDaddy, İsimtescil, Google Domains vb.) DNS yönetim panelinden aşağıdaki kayıtları ekleyin:

1. **CNAME Kaydı**:
   - **Host/Ad**: `www`
   - **Hedef**: `[kullaniciadi].github.io` (GitHub kullanıcı adınız)

2. **A Kayıtları (GitHub Pages IP Adresleri)**:
   - Host/Ad: `@` -> `185.199.108.153`
   - Host/Ad: `@` -> `185.199.109.153`
   - Host/Ad: `@` -> `185.199.110.153`
   - Host/Ad: `@` -> `185.199.111.153`

### GitHub Ayarları Kontrolü
GitHub repository ayarlarında `Settings` > `Pages` kısmına giderek şunları doğrulayın:
- **Build and deployment > Source**: `Deploy from a branch`
- **Branch**: `gh-pages` / `/ (root)`
- **Custom domain**: `minimizepdf.com` (Enforce HTTPS işaretli olmalı)

---
*Not: Vercel kullanımı iptal edilmiştir. Sadece GitHub Pages kullanılmaktadır.*
