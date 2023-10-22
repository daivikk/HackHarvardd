/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['pdf2json'],
    },
    future: { webpack5: true },
    webpack: (config, {}) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    }
};

module.exports = nextConfig
