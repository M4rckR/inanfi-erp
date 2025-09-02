import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/salud',
        destination: '/salud/dashboard',
        permanent: true,
      },
      {
        source: '/logistica',
        destination: '/logistica/dashboard',
        permanent: true,
      },
      {
        source: '/maestro',
        destination: '/maestro/dashboard',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
