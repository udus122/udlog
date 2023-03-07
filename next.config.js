/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "i.gyazo.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
