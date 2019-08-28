const PengaturanSPPD = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/sppd/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/sppd/Index'))
    }, 'pages/pengaturan/sppd'
  )
}

module.exports = {
  PengaturanSPPD,
}
