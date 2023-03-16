/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/redirect',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
