import axios from "axios"
let dynamicRoutes = () => {
  const routes = axios
    .get("https://admin.raisinlove.com/wp-json/wp/v2/posts?page=1&per_page=20")
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
    title: "Raisinlove - Steph Dumais Illustraion and Comics",
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
        content: "Raisinlove - Steph Dumais Illustraion and Comics",
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
        property:"twitter:card",
        content:"summary"
      },
      {
        property:"twitter:site",
        content:"@raisinlove"
      },
      {
        property:"twitter:title",
        content: "Raisinlove - Steph Dumais Illustraion and Comics",
      },
      {
        property:"twitter:description",
        content: "Steph Dumais' illustrations in horror, pinups, comics, flyers, album covers, zombies, demons, witches and more!"
      },
      {
        property:"twitter:image",
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
      {
        rel: "stylesheet",
        href:
          //"https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Titillium+Web:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
      }
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
    ['@nuxtjs/robots', {
      UserAgent: 'Googlebot',
      Disallow: '/wp-admin/',
      Sitemap: 'https://www.raisinlove.com/robots.txt',
    }],
    '@nuxtjs/sitemap',
  ],
  sitemap:{
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
  }
}
