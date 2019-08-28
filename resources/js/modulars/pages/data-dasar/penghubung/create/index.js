const DataDasarPenghubungCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/penghubung/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/penghubung/create/Index'))
    }, 'pages/data-dasar/penghubung/create'
  )
}

module.exports = {
  DataDasarPenghubungCreate,
}
