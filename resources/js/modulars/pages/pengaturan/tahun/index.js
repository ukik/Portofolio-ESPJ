const { PengaturanTahunCreate } = require('./create/index')

const PengaturanTahun = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/tahun/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/tahun/Index'))
    }, 'pages/pengaturan/tahun'
  )
}

module.exports = {
  PengaturanTahun,
  PengaturanTahunCreate,
}
