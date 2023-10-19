/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.notion.so",
      "images.unsplash.com",
      "source.unsplash.com",
      "i.gyazo.com",
    ],
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
