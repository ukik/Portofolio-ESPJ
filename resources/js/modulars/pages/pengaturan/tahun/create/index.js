const PengaturanTahunCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/tahun/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/tahun/create/Index'))
    }, 'pages/pengaturan/tahun/create'
  )
}

module.exports = {
  PengaturanTahunCreate,
}
