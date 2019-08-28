const DataDasarBendaharaEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/bendahara/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/bendahara/edit/Index'))
    }, 'pages/data-dasar/bendahara/edit'
  )
}

module.exports = {
  DataDasarBendaharaEdit,
}
