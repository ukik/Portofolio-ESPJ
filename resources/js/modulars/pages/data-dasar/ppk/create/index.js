const DataDasarPPKCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/ppk/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/ppk/create/Index'))
    }, 'pages/data-dasar/ppk/create'
  )
}

module.exports = {
  DataDasarPPKCreate,
}
