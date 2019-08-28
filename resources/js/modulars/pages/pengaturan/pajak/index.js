const PengaturanPajak = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/pajak/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/pajak/Index'))
    }, 'pages/pengaturan/pajak'
  )
}

module.exports = {
  PengaturanPajak,
}
