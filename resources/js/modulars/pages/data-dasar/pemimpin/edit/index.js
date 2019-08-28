const DataDasarPemimpinEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/pemimpin/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/pemimpin/edit/Index'))
    }, 'pages/data-dasar/pemimpin/edit'
  )
}

module.exports = {
  DataDasarPemimpinEdit,
}
