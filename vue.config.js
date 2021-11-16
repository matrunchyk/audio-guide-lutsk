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
};
