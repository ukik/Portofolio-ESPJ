const PengaturanBerkasEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/berkas/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/berkas/edit/Index'))
    }, 'pages/pengaturan/berkas/edit'
  )
}

module.exports = {
  PengaturanBerkasEdit,
}
