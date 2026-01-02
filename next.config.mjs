/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // If your repo name is not the root, uncomment and set basePath:
  // basePath: '/brian-portfolio',
  // trailingSlash: true,
}

export default nextConfig

