const DataDasarRekananCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/rekanan/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/rekanan/create/Index'))
    }, 'pages/data-dasar/rekanan/create'
  )
}

module.exports = {
  DataDasarRekananCreate,
}
