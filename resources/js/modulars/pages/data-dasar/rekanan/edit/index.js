const DataDasarRekananEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/rekanan/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/rekanan/edit/Index'))
    }, 'pages/data-dasar/rekanan/edit'
  )
}

module.exports = {
  DataDasarRekananEdit,
}
