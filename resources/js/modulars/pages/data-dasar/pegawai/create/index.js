const DataDasarPegawaiCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/pegawai/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/pegawai/create/Index'))
    }, 'pages/data-dasar/pegawai/create'
  )
}

module.exports = {
  DataDasarPegawaiCreate,
}
