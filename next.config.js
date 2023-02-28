/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'bcrypt'];
  //   return config;
  // },
};

module.exports = nextConfig;
