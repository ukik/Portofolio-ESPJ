const DataDasarLokasiDalamNegeriEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/data-dasar/lokasi/dalam-negeri/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/data-dasar/lokasi/dalam-negeri/edit/Index'))
    }, 'pages/data-dasar/lokasi/dalam-negeri/edit'
  )
}

module.exports = {
  DataDasarLokasiDalamNegeriEdit,
}
