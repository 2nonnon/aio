// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
