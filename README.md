# Windmill with Laravel Breeze as Backend API

## Introduction

This repository is an implementing of the [Laravel Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Next.js](https://nextjs.org). All of the authentication boilerplate is already written for you - powered by [Laravel Sanctum](https://laravel.com/docs/sanctum), allowing you to quickly begin pairing your beautiful Next.js frontend with a powerful Laravel backend.

## Official Documentation

### Installation

First, create a Next.js compatible Laravel backend by installing Laravel Breeze into a [fresh Laravel application](https://laravel.com/docs/installation) and installing Breeze's API scaffolding:

```bash
# Create the Laravel application...
cd backend

# Install Breeze and dependencies...
composer require laravel/breeze (if not already installed)

php artisan breeze:install api
```

Next,
- Ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000/example`, respectively.

- In `app/Providers/RouteServiceProvider.php`, update : `public const HOME = '/';`

- In `app/Http/Middleware/Authenticate.php`, update :
```php
protected function redirectTo($request)
{
    if (! $request->expectsJson()) {
        return config('app.frontend_url').'/login?next_to='.urlencode($request->url());
    }
}
``` 

- In `app/Http/Middleware/RedirectIfAuthenticated.php`, update :
```php
public function handle(Request $request, Closure $next, ...$guards)
{
    $guards = empty($guards) ? [null] : $guards;

    foreach ($guards as $guard) {
        if (Auth::guard($guard)->check()) {
            return redirect(config('app.frontend_url').RouteServiceProvider::HOME);
        }
    }

    return $next($request);
}
```

- In `config/cors.php`, update :
```php
<?php

$frontedUrl = env('FRONTEND_URL', '*');

if ($frontedUrl !== '*') {
    $parsed = parse_url($frontedUrl);
    $frontedUrl = sprintf(
        '%s://%s%s',
        $parsed['scheme'],
        $parsed['host'],
        isset($parsed['port']) ? ':' . $parsed['port'] : ''
    );
}

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [$frontedUrl],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];

```


After defining the appropriate environment variables and update several codes above, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env.local` and supply the URL of your backend:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `yarn dev` or `npm run dev`. The application will be available at `http://localhost:3000`:

```
yarn dev

# or

npm run dev
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:
```bash
npm install
# or
yarn install
```

then, you can run the development server due to the project being on a older version of next you must set a NODE_OPTIONS env variable before running dev server:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run dev
# or
NODE_OPTIONS=--openssl-legacy-provider yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
