const { PengaturanHonor } = require('./honor/index')
const { PengaturanNomorSurat } = require('./nomor-surat/index')
const { PengaturanPajak } = require('./pajak/index')
const { PengaturanSPPD } = require('./sppd/index')
const { PengaturanUser, PengaturanUserCreate, PengaturanUserEdit } = require('./user/index')
const { PengaturanTahun, PengaturanTahunCreate } = require('./tahun/index')
const { PengaturanAliranKas, PengaturanAliranKasRincian, PengaturanAliranKasUpload } = require('./aliran-kas/index')
const { PengaturanBerkas, PengaturanBerkasCreate, PengaturanBerkasEdit } = require('./berkas/index')

const Pengaturan = resolve => {
  require.ensure(
    ['../../../components/pages/pengaturan/Index'],
    () => {
      resolve(require('../../../components/pages/pengaturan/Index'))
    }, 'pages/pengaturan'
  )
}

module.exports = {
  Pengaturan,
  PengaturanHonor,
  PengaturanNomorSurat,
  PengaturanPajak,
  PengaturanSPPD,
  PengaturanUser, PengaturanUserCreate, PengaturanUserEdit,
  PengaturanTahun, PengaturanTahunCreate,
  PengaturanAliranKas, PengaturanAliranKasRincian, PengaturanAliranKasUpload,
  PengaturanBerkas, PengaturanBerkasCreate, PengaturanBerkasEdit,
}
