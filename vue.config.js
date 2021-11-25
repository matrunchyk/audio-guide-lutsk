module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
        // .test(/src\/assets\/svg\/(.*)\.(svg)(\?.*)?$/)
        .test(/(.*)\.+(svg)$/i)

    .use('vue-loader')
    .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
    .end()
    .use('vue-svg-loader')
    .loader('vue-svg-loader');

    config.module
    .rule('graphql')
    .test(/\.graphql$/)
    .use('graphql-tag/loader')
    .loader('graphql-tag/loader')
    .end()
  },
  pwa: {
    name: 'Lutsk Audio Tour',
    themeColor: '#e31f25',
    msTileColor: '#e31f25',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: '',
    manifestPath: 'manifest.json',
    workboxPluginMode: 'GenerateSW',
    manifestCrossorigin: undefined,
    workboxOptions: {
      swDest: 'service-worker.js',
      sourcemap: true,
      clientsClaim: true,
      skipWaiting: true,
      offlineGoogleAnalytics: true,
      exclude: [
        /\.map$/,
        /img\/icons\//,
        /favicon\.ico$/,
        /^manifest.*\.js?$/,
        /^_redirects$/,
      ]
    },
    iconPaths: {
      faviconSVG: 'img/icons/icon-vector.svg',
      favicon32: 'img/icons/purpose-maskable/favicon-32x32.png',
      favicon16: 'img/icons/purpose-maskable/favicon-16x16.png',
      appleTouchIcon: 'apple-touch-icon-152x152.png',
      msTileImage: 'img/icons/purpose-maskable/msapplication-icon-144x144.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
    },
    manifestOptions: {
      start_url: "/?source=pwa",
      id: "audio-guide-lutsk",
      display: "standalone",
      description: "Lutsk Audio Guide | Аудіо-гід по Луцьку",
      categories: ["music", "education", "lifestyle", "navigation", "photo", "travel"],
      dir: "ltr",
      icons: [
        {
          "src": "img/icons/icon-vector.svg",
          "sizes": "512x512",
          "type": "image/svg+xml",
        },
        {
          "src": "img/icons/purpose-maskable/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-maskable/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "img/icons/purpose-any/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "img/icons/purpose-any/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "any",
        },
      ],
      "shortcuts": [
        {
          "name": "Map",
          "short_name": "Map",
          "description": "Use map view",
          "url": "/map?source=pwa",
          "icons": [{ "src": "img/icons/map.png", "sizes": "192x192", "type": "image/png" }],
        },
        {
          "name": "List",
          "short_name": "List",
          "description": "Use list view",
          "url": "/?source=pwa",
          "icons": [{ "src": "img/icons/list.png", "sizes": "192x192", "type": "image/png" }],
        },
      ],
      "screenshots" : [
        {
          "src": "img/shot1.png",
          "sizes": "2208x1068",
          "type": "image/png"
        },
        {
          "src": "img/shot2.png",
          "sizes": "2208x1068",
          "type": "image/png"
        }
      ]
    },
  },
};
