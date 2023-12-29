/* eslint-disable no-undef */
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
  staticPageGenerationTimeout: 1000 * 60 * 16,
};

module.exports = nextConfig;
