const PengaturanUserEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/pengaturan/user/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/pengaturan/user/edit/Index'))
    }, 'pages/pengaturan/user/edit'
  )
}

module.exports = {
  PengaturanUserEdit,
}
