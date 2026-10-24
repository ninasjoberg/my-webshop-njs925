/** @type {import('next').NextConfig} */
module.exports = {
    compiler: {
        /* replaces babel-plugin-styled-components, needed for matching class names between server and client */
        styledComponents: true,
    },
    images: {
        /* allow loading images from the Sanity.io CDN */
        remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    },
    async redirects() {
        return [
            {
                source: '/produkt/armband-silver-mountain',
                destination: '/produkt/armband-silver-mountains',
            },
            { source: '/about', destination: '/om' },
            { source: '/conditions', destination: '/villkor' },
        ].map((redirect) => ({ ...redirect, statusCode: 301 }))
    },
}
