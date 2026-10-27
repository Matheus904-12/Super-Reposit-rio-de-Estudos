import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }, // export estático: as imagens já são otimizadas por sharp no script
}
export default config
