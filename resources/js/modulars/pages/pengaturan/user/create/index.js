const PengaturanUserCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/user/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/user/create/Index'))
    }, 'pages/pengaturan/user/create'
  )
}

module.exports = {
  PengaturanUserCreate,
}
