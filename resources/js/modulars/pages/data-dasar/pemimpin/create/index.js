const DataDasarPemimpinCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/pemimpin/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/pemimpin/create/Index'))
    }, 'pages/data-dasar/pemimpin/create'
  )
}

module.exports = {
  DataDasarPemimpinCreate,
}
