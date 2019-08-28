const { PengaturanUserCreate } = require('./create/index')
const { PengaturanUserEdit } = require('./edit/index')

const PengaturanUser = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/user/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/user/Index'))
    }, 'pages/pengaturan/user'
  )
}

module.exports = {
  PengaturanUser,
  PengaturanUserCreate,
  PengaturanUserEdit,
}
