import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['http://localhost:3000', 'http://10.8.0.4:3000/'], // Укажите нужные домены
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src')],
  },
};

export default nextConfig;
