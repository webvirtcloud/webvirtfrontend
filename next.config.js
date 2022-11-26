/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: '/servers',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
