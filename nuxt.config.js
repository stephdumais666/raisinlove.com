import axios from "axios"
let dynamicRoutes = () => {
  const routes = axios
    .get("https://admin.raisinlove.com/wp-json/wp/v2/posts?page=1&per_page=100")
    .then(res => {
      return res.data.map(post => `/blog/${post.slug}`)
    })
  console.log(routes)
  return routes
}

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: "Raisinlove - Steph Dumais Illustration and Comics",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Steph Dumais' illustrations in horror, pinups, comics, flyers, album covers, zombies, demons, witches and more!"
      },
      {
        property: "og:title",
        content: "Raisinlove - Steph Dumais Illustration and Comics",
      },
      {
        property: "og:description",
        content: "Steph Dumais' illustrations in horror, pinups, comics, flyers, album covers, zombies, demons, witches and more!"
      },
      {
        property: "og:image",
        content: "https://www.raisinlove.com/og.jpg"
      },
      {
        property: "og:url",
        content: "https://www.raisinlove.com"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "fb:app_id",
        content: "137378089627412"
      },
      {
        name: "twitter:card",
        content: "summary"
      },
      {
        name: "twitter:site",
        content: "@raisinlove"
      },
      {
        name: "twitter:title",
        content: "Raisinlove - Steph Dumais Illustration and Comics",
      },
      {
        name: "twitter:description",
        content: "Steph Dumais' illustrations in horror, pinups, comics, flyers, album covers, zombies, demons, witches and more!"
      },
      {
        name: "twitter:image",
        content: "https://www.raisinlove.com/og.jpg"
      },
    ],
    link: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/mixins.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/redirectssl.js",
    "~/plugins/posts.server.js",
    "~/plugins/tags.server.js",
    //"~/plugins/illustrations.server.js", //preloading illustrations
    "~/plugins/illustrationtags.server.js", //preloading tags
    "~/plugins/dateformat.js",
    "~/plugins/hammer.client.js",
  ],
  generate: {
    routes: dynamicRoutes
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    //'@nuxtjs/amp',
    ['@nuxtjs/google-fonts', {
      families: {
        'Bebas+Neue': true,
        'Titillium+Web': {
          ital: [400],
          wght: [300, 400, 600, 700]
        }
      },
      display: 'swap',
      download: true,
      base64: true,

    }],
    ['@nuxtjs/robots', {
      UserAgent: 'Googlebot',
      Disallow: '/wp-admin/',
      Sitemap: 'https://www.raisinlove.com/sitemap.xml',
    }],
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    hostname: 'https://www.raisinlove.com',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  target: 'static'
}
