const DataDasarLokasiLuarNegeriCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/data-dasar/lokasi/luar-negeri/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/data-dasar/lokasi/luar-negeri/create/Index'))
    }, 'pages/data-dasar/lokasi/luar-negeri/create'
  )
}

module.exports = {
  DataDasarLokasiLuarNegeriCreate,
}
