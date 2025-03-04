import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'physioshark.org',
      },
      {
        protocol: 'https',
        hostname: 'jodierummer.com',
      },
      {
        protocol: 'https',
        hostname: 'scholar.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/media.html',
        destination: '/media',
        permanent: true,
      },
      {
        source: '/publications.html',
        destination: '/publications',
        permanent: true,
      },
      {
        source: '/embed',
        destination: '/collaborators/embed',
        permanent: true,
      },
      {
        source: '/lab',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/rummerlab',
        destination: '/team',
        permanent: true,
      },
    ]
  },
  async headers() {
      // CORS blanket statement over all endpoints
      return [
          {
              // Routes this applies to
              source: '/api/(.*)',
              // Headers
              headers: [
                  // Allow all domains to have access
                  {
                      key: 'Access-Control-Allow-Origin',
                      value: '*',
                  },
                  // Allows for specific methods accepted
                  {
                      key: 'Access-Control-Allow-Methods',
                      value: 'GET',
                  },
                  // Allows for specific headers accepted (These are a few standard ones)
                  {
                      key: 'Access-Control-Allow-Headers',
                      value: 'Content-Type, Authorization, Accept',
                  },
              ],
          },
      ]
  },
}

export default config
