module.exports = {
  configureWebpack: {
    devtool: "cheap-module-source-map",
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://tp5.project.redev.top',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}