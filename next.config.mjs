/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastapi.tiangolo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'streamlit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scikit-learn.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'keras.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
}

export default nextConfig
