const DataDasarDPAEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/dpa/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/dpa/edit/Index'))
    }, 'pages/data-dasar/dpa/edit'
  )
}

module.exports = {
  DataDasarDPAEdit,
}
