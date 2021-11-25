module.exports = {
  chainWebpack: (config) => {
    config.module
        .rule('graphql')
        .test(/\.graphql$/)
        .use('graphql-tag/loader')
          .loader('graphql-tag/loader')
          .end()
  },
  configureWebpack: {
    module: {
      rules: [
        {
          // test: /assets\/[\w-]+\.svg$/,
          test: /assets\/(.*)\.+(svg)$/i,
          type: 'asset/source',
        },
      ],
    },
  },
  pwa: {
    name: 'Lutsk Audio Tour',
    themeColor: '#e31f25',
    msTileColor: '#e31f25',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    manifestOptions: {
      start_url: "/?source=pwa",
      id: "audio-guide-lutsk",
      display: "standalone",
      scope: "/",
      icons: [
        {
          "src": "img/icons/icon-vector.svg",
          "sizes": "512x512",
          "type": "image/svg+xml"
        },
        {
          "src": "img/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "img/icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "any maskable"
        },
      ],
      "shortcuts": [
        {
          "name": "Map",
          "short_name": "Map",
          "description": "Use map view",
          "url": "/map?source=pwa",
          "icons": [{"src": "/icons/map.svg", "sizes": "192x192", "type": "image/svg+xml" }]
        },
        {
          "name": "List",
          "short_name": "List",
          "description": "Use list view",
          "url": "/?source=pwa",
          "icons": [{"src": "/icons/list.svg", "sizes": "192x192", "type": "image/svg+xml" }]
        }
      ],
    }
  }
};
