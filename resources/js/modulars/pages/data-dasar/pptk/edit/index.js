const DataDasarPPTKEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/pptk/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/pptk/edit/Index'))
    }, 'pages/data-dasar/pptk/edit'
  )
}

module.exports = {
  DataDasarPPTKEdit,
}
