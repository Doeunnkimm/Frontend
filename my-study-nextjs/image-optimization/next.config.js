/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig
