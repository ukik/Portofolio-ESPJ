const PengaturanNomorSurat = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/nomor-surat/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/nomor-surat/Index'))
    }, 'pages/pengaturan/nomor-surat'
  )
}

module.exports = {
  PengaturanNomorSurat,
}
