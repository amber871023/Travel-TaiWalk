module.exports = {
  // publicPath: '/Travel-TaiWalk/'
  publicPath: process.env.NODE_ENV === 'production' ? '/Travel-TaiWalk/dist/' : '/'
}
