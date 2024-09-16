/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000'
      },
      {
        protocol: 'https',
        hostname: 'api.nextjs-commerce-medusa.reactbricks.com'
      }
    ]
  }
};
