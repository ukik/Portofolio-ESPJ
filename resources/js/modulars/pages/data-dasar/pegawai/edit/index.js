const DataDasarPegawaiEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/pegawai/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/pegawai/edit/Index'))
    }, 'pages/data-dasar/pegawai/edit'
  )
}

module.exports = {
  DataDasarPegawaiEdit,
}
