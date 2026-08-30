/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  agentRules: false,
  outputFileTracingIncludes: {
    '/**': ['./public/data/**/*.json'],
  },
}

export default nextConfig
