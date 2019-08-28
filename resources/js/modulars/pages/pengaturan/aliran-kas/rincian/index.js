const PengaturanAliranKasRincian = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/aliran-kas/rincian/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/aliran-kas/rincian/Index'))
    }, 'pages/pengaturan/aliran-kas/rincian'
  )
}

module.exports = {
  PengaturanAliranKasRincian,
}
