const {join} = require('path')
const {name, main} = require('./package.json')
const path = join(__dirname, main)

module.exports = (nextConfig = {}) => {

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const {dev, isServer} = options

      // XXX this shouldn't be necessary!
      config.resolve.alias = Object.assign({
        [name]: path
      }, config.resolve.alias)

      config.module.rules.push({
        test: new RegExp(`^${path}$`),
        use: require.resolve('val-loader')
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
