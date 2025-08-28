/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line, or set to undefined
  // output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
