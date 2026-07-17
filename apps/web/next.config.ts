import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['dalua-dev.mmarceniuk.dev'],
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dalua-dev.mmarceniuk.dev',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dalua-dev.mmarceniuk.dev',
        pathname: '/api/uploads/**',
      },
    ],
  },
}

export default nextConfig
