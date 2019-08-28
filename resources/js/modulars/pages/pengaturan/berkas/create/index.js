const PengaturanBerkasCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/berkas/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/berkas/create/Index'))
    }, 'pages/pengaturan/berkas/create'
  )
}

module.exports = {
  PengaturanBerkasCreate,
}
