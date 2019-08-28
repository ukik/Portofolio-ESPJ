const PengaturanHonor = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/honor/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/honor/Index'))
    }, 'pages/pengaturan/honor'
  )
}

module.exports = {
  PengaturanHonor,
}
