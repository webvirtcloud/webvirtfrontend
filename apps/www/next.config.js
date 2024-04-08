const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async redirects () {
    return [
      {
        source: '/docs/getting-started/setup',
        destination: '/docs/introduction',
        permanent: true,
      },
    ]
  }
}

module.exports = withContentlayer(nextConfig)
