const DataDasarBidangCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/bidang/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/bidang/create/Index'))
    }, 'pages/data-dasar/bidang/create'
  )
}

module.exports = {
  DataDasarBidangCreate,
}
