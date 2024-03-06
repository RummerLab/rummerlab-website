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
      {
        protocol: 'https',
        hostname: 'scholar.googleusercontent.com',
      }
    ],
  },
}

module.exports = nextConfig
