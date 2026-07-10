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
}

export default nextConfig
