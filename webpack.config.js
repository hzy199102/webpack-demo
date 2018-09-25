module.exports = function(env) {
    return require(`./cmd/webpack.config.${env}.js`)
}