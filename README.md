# Buildino Website

لندینگ فارسی بیلدینو با Laravel 12، React 19 و Vite.

## اجرای محلی

```powershell
Copy-Item .env.example .env
composer install
php artisan key:generate
npm install
npm run dev
php artisan serve
```

سایت روی `http://127.0.0.1:8000` در دسترس است. راهنمای استقرار امن از Git و بسته آماده پارس‌پک در [DEPLOY.md](DEPLOY.md) قرار دارد.
