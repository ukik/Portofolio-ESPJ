const DataDasarPenghubungEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/penghubung/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/penghubung/edit/Index'))
    }, 'pages/data-dasar/penghubung/edit'
  )
}

module.exports = {
  DataDasarPenghubungEdit,
}
