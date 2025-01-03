// next.config.mjs
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for highlighting potential problems in your app
  swcMinify: true, // Enables SWC-based minification for faster builds
  experimental: {}, // Add any experimental features you want to use
  images: {
    domains: ['assets.aceternity.com'], // Add the external hostname here
  },
  env: {}, // Define environment variables that will be accessible in your app
};

export default nextConfig;
