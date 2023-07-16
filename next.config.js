const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
     sassOptions: {
          includePaths: [path.join(__dirname, 'styles')],
     },
     webpack: (config) => { config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' }); return config; },
}

module.exports = nextConfig
