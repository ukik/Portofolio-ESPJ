const DataDasarBendaharaCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/bendahara/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/bendahara/create/Index'))
    }, 'pages/data-dasar/bendahara/create'
  )
}

module.exports = {
  DataDasarBendaharaCreate,
}
