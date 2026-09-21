# راهنمای استقرار بیلدینو روی پارس‌پک

این پروژه با Laravel 12، React و Vite ساخته شده و به PHP 8.2 یا جدیدتر نیاز دارد. خود لندینگ در وضعیت فعلی به دیتابیس نیاز ندارد.

## استقرار مستقیم از Git

مخزن را در یک مسیر خصوصی مانند `~/buildino` دریافت کنید و Document Root دامنه را روی `~/buildino/public` قرار دهید. کل مخزن را مستقیماً داخل `public_html` clone نکنید؛ فقط پوشه `public` باید از وب قابل دسترسی باشد.

فایل‌های buildشده Vite در Git نگهداری می‌شوند، بنابراین سرور برای نمایش سایت به Node.js نیاز ندارد. بعد از هر pull اجرا کنید:

```bash
cd ~/buildino
composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader
php artisan optimize
```

در اولین استقرار، `.env.example` را به `.env` کپی کنید، `APP_URL` را دقیقاً روی دامنه HTTPS بگذارید و سپس `php artisan key:generate --force` را اجرا کنید. فایل `.env` نباید وارد Git شود.

اگر پنل فقط امکان deploy داخل `public_html` را می‌دهد و Document Root قابل تغییر نیست، از بسته دوپوشه‌ای بخش بعد استفاده کنید.

## ساخت بسته آماده آپلود

در ویندوز و از ریشه پروژه اجرا کنید:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build-parspack-package.ps1
```

خروجی در `release/buildino-parspack.zip` ساخته می‌شود. فایل ZIP دو پوشه دارد:

- `buildino`: کد خصوصی برنامه، تنظیمات و dependencyهای PHP
- `public_html`: فقط فایل‌های عمومی، assetهای buildشده و ورودی امن برنامه

## استقرار روی هاست اشتراکی

پیش از جایگزین‌کردن فایل‌های یک دامنه فعال، از `public_html` و تنظیمات فعلی آن نسخه پشتیبان بگیرید.

1. PHP دامنه را روی نسخه 8.2 یا جدیدتر قرار دهید و افزونه‌های رایج Laravel مانند `mbstring`، `openssl`، `pdo`، `tokenizer`، `xml`، `ctype`، `fileinfo` و `curl` را فعال کنید.
2. محتوای ZIP را در home اکانت استخراج کنید؛ `buildino` و `public_html` باید کنار هم باشند.
3. داخل `buildino`، فایل `.env.example` را با نام `.env` کپی کنید.
4. در `.env` مقدار `APP_URL` را روی دامنه HTTPS قرار دهید و `APP_DEBUG=false` را حفظ کنید.
5. از Terminal پنل، داخل پوشه `buildino` اجرا کنید:

```bash
php artisan key:generate --force
php artisan optimize
```

6. پوشه‌های `storage` و `bootstrap/cache` باید برای PHP قابل نوشتن باشند؛ معمولاً permission برابر `775` کافی است.
7. آدرس `/up` را باز کنید؛ پاسخ موفق یعنی Laravel اجرا شده است. سپس صفحه اصلی را بررسی کنید.

اگر نام یا محل پوشه خصوصی را عوض کردید، مقدار `$applicationPath` در `public_html/index.php` را متناسب با آن تغییر دهید.

## روش پیشنهادی با Document Root قابل تنظیم

اگر پنل اجازه تغییر Document Root دامنه را می‌دهد، کل پروژه را در یک پوشه خصوصی آپلود و Document Root را مستقیماً روی پوشه `public` همان پروژه تنظیم کنید. در این حالت از `public/index.php` استاندارد Laravel استفاده می‌شود و نیازی به ساختار دوپوشه‌ای بالا نیست.

## توسعه محلی

```powershell
Copy-Item .env.example .env
php artisan key:generate
composer install
npm install
npm run dev
php artisan serve
```

برای خروجی production:

```powershell
npm run build
php artisan test
```

بعد از تغییر فایل‌های frontend، خروجی جدید `public/build` را نیز همراه تغییرات commit کنید.
