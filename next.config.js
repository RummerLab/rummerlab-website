/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //esmExternals: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
}

module.exports = nextConfig
