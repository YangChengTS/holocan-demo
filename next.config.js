/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  
  // 添加重定向规则
  async redirects() {
    return [
      {
        source: '/login/:path*',
        destination: '/auth/login/:path*',
        permanent: true,
      },
      {
        source: '/register/:path*',
        destination: '/auth/register/:path*',
        permanent: true,
      },
      {
        source: '/reset-password/:path*',
        destination: '/auth/reset-password/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 