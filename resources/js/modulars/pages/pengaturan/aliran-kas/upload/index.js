const PengaturanAliranKasUpload = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/aliran-kas/upload/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/aliran-kas/upload/Index'))
    }, 'pages/pengaturan/aliran-kas/upload'
  )
}

module.exports = {
  PengaturanAliranKasUpload,
}
