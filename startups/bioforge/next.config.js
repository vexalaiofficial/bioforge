/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.bioforge.app', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig