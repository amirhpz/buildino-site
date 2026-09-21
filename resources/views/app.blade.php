<!doctype html>
<html lang="fa" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="بیلدینو؛ مدیریت شارژ، پرداخت، خدمات، رزرو امکانات، مهمانان و ارتباط با مدیریت ساختمان در یک اپلیکیشن.">
        <meta name="theme-color" content="#0D1D2F" media="(prefers-color-scheme: dark)">
        <meta name="theme-color" content="#F4FAF9" media="(prefers-color-scheme: light)">
        <meta property="og:title" content="بیلدینو | همه کارهای ساختمان در یک اپلیکیشن">
        <meta property="og:description" content="از شارژ و صورتحساب تا خدمات، رزرو، مهمانان و پشتیبانی؛ کارهای واحدتان را آنلاین مدیریت کنید.">
        <meta property="og:type" content="website">
        <link rel="icon" type="image/png" href="{{ asset('images/logo/brand-color.png') }}">
        <title>بیلدینو | مدیریت امور ساختمان و واحد</title>
        <script src="{{ asset('theme-init.js') }}"></script>
        @viteReactRefresh
        @vite('resources/js/main.tsx')
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
