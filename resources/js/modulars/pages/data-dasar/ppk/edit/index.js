const DataDasarPPKEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/ppk/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/ppk/edit/Index'))
    }, 'pages/data-dasar/ppk/edit'
  )
}

module.exports = {
  DataDasarPPKEdit,
}
