const DataDasarLokasiLuarNegeriEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/data-dasar/lokasi/luar-negeri/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/data-dasar/lokasi/luar-negeri/edit/Index'))
    }, 'pages/data-dasar/lokasi/luar-negeri/edit'
  )
}

module.exports = {
  DataDasarLokasiLuarNegeriEdit,
}
