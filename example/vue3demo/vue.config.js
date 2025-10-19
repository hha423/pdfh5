const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /node_modules\/pdfh5/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie 11']
                  }
                }]
              ],
              plugins: [
                '@babel/plugin-transform-private-methods',
                '@babel/plugin-transform-class-static-block',
                '@babel/plugin-transform-class-properties'
              ]
            }
          }
        }
      ]
    },
  }
});
