/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
  webpack: (config) => {
    // 路径别名配置
    return config;
  },
}

module.exports = nextConfig 