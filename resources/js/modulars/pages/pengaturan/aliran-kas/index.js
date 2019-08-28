const { PengaturanAliranKasRincian } = require('./rincian/index')
const { PengaturanAliranKasUpload } = require('./upload/index')

const PengaturanAliranKas = resolve => {
  require.ensure(
    ['../../../../components/pages/pengaturan/aliran-kas/Index'],
    () => {
      resolve(require('../../../../components/pages/pengaturan/aliran-kas/Index'))
    }, 'pages/pengaturan/aliran-kas'
  )
}

module.exports = {
  PengaturanAliranKas,
  PengaturanAliranKasRincian,
  PengaturanAliranKasUpload,
}
