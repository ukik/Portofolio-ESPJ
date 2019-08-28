const DataDasarPPTKCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/pptk/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/pptk/create/Index'))
    }, 'pages/data-dasar/pptk/create'
  )
}

module.exports = {
  DataDasarPPTKCreate,
}
