const { PengaturanBerkasCreate } = require('./create/index')
const { PengaturanBerkasEdit } = require('./edit/index')

const PengaturanBerkas = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/berkas/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/berkas/Index'))
    }, 'pages/pengaturan/berkas'
  )
}

module.exports = {
  PengaturanBerkas,
  PengaturanBerkasCreate,
  PengaturanBerkasEdit,
}
