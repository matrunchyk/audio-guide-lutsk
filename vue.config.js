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
    short_name: "Lutsk Audio Tour",
    description: "Lutsk Audio Tour",
    themeColor: '#e31f25',
    msTileColor: '#e31f25',
    lang: "en",
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      maskIcon: 'img/icons/maskable.png',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
};
