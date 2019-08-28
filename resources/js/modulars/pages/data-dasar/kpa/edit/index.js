const DataDasarKPAEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/kpa/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/kpa/edit/Index'))
    }, 'pages/data-dasar/kpa/edit'
  )
}

module.exports = {
  DataDasarKPAEdit,
}
