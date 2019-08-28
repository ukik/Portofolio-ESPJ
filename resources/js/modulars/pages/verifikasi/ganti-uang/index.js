const { VerifikasiGantiUangReview } = require('./review/index')

const VerifikasiGantiUang = resolve => {
  require.ensure(
    ['../../../../components/pages/verifikasi/ganti-uang/Index'],
    () => {
      resolve(require('../../../../components/pages/verifikasi/ganti-uang/Index'))
    }, 'pages/verifikasi/ganti-uang'
  )
}

module.exports = {
  VerifikasiGantiUang,
  VerifikasiGantiUangReview,
}
