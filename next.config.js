/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  basePath: '/application-autofill',
  async redirects() {
    return []
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate',
          },
        ],
      },
    ]
  },
}
