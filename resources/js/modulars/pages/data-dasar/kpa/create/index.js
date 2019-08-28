const DataDasarKPACreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/kpa/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/kpa/create/Index'))
    }, 'pages/data-dasar/kpa/create'
  )
}

module.exports = {
  DataDasarKPACreate,
}
