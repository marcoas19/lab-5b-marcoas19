const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Lab 5A',
    themeColor: '#2871C7'
  }
})
