const DataDasarLokasiDalamNegeriCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/data-dasar/lokasi/dalam-negeri/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/data-dasar/lokasi/dalam-negeri/create/Index'))
    }, 'pages/data-dasar/lokasi/dalam-negeri/create'
  )
}

module.exports = {
  DataDasarLokasiDalamNegeriCreate,
}
