/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  agentRules: false,
  serverExternalPackages: ['nodemailer'],
  outputFileTracingIncludes: {
    '/**': ['./public/data/**/*.json'],
  },
}

export default nextConfig
