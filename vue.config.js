const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  filenameHashing: true,
  publicPath: '',
  devServer: {
    https: false
  },
  transpileDependencies: []
});