const _NotFound = require('./404/index')
const _DataDasar = require('./data-dasar/index')
const _Pengaturan = require('./pengaturan/index')
const _Permohonan = require('./permohonan/index')
const _Spj = require('./spj/index')
const _Verifikasi = require('./verifikasi/index')
const _Lampiran = require('./lampiran/index')
const _Login = require('./login/index')
const _Welcome = require('./welcome/index')
const _Perjadin = require('./rekap/index')

module.exports = {
  mixins: [
    _NotFound,
    _DataDasar,
    _Pengaturan,
    _Permohonan,
    _Spj,
    _Verifikasi,
    _Lampiran,
    _Login,
    _Welcome,
    _Perjadin,
  ],
}
