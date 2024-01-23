/** @type {import('next').NextConfig} */
const nextConfig = {
  //experimental: {
    //appDir: true,
  //},
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
