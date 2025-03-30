import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['http://localhost:3000', 'http://10.8.0.4:3000/'], // Укажите нужные домены
  },
};

export default nextConfig;
