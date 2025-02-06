import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
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
        hostname: 'physioshark.org',
      },
      {
        protocol: 'https',
        hostname: 'jodierummer.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent-syd2-1.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'graph.instagram.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      { // TEMPORARY
          protocol: 'https',
          hostname: '**',
      },
    ],
  },
  async headers() {
      // CORS blanket statement over all endpoints
      return [
          {
              // Routes this applies to
              source: '/api/(.*)',
              // Headers
              headers: [
                  // Allow for specific domains to have access or * for all
                  {
                      key: 'Access-Control-Allow-Origin',
                      value: 'http://localhost:3000, rummerlab.com, physioshark.com, jodierummer.com',
                  },
                  // Allows for specific methods accepted
                  {
                      key: 'Access-Control-Allow-Methods',
                      value: 'GET',
                  },
                  // Allows for specific headers accepted (These are a few standard ones)
                  {
                      key: 'Access-Control-Allow-Headers',
                      value: 'Content-Type, Authorization',
                  },
              ],
          },
      ]
  },
}

export default config
