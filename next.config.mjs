/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' https://positive-pipefish-74.accounts.dev https://positive-pipefish-74.clerk.accounts.dev https://cdn.jsdelivr.net https://js.sentry-cdn.com https://browser.sentry-cdn.com https://*.ingest.sentry.io https://challenges.cloudflare.com https://scdn.clerk.com https://segapi.clerk.com; script-src 'self' https://positive-pipefish-74.accounts.dev https://positive-pipefish-74.clerk.accounts.dev https://cdn.jsdelivr.net https://js.sentry-cdn.com https://browser.sentry-cdn.com https://*.ingest.sentry.io https://challenges.cloudflare.com https://scdn.clerk.com https://segapi.clerk.com 'unsafe-eval';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
