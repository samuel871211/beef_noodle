/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"]
  }
  // output: 'export',
  // trailingSlash: true
}

module.exports = nextConfig
