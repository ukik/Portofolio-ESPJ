const DataDasarBidangEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/bidang/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/bidang/edit/Index'))
    }, 'pages/data-dasar/bidang/edit'
  )
}

module.exports = {
  DataDasarBidangEdit,
}
