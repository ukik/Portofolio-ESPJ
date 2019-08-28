const DataDasarDPARincian = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/dpa/rincian/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/dpa/rincian/Index'))
    }, 'pages/data-dasar/dpa/rincian'
  )
}

module.exports = {
  DataDasarDPARincian,
}
