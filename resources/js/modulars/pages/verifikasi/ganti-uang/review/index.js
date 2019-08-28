const VerifikasiGantiUangReview = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/ganti-uang/review/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/ganti-uang/review/Index'))
    }, 'pages/verifikasi/ganti-uang/review'
  )
}

module.exports = {
  VerifikasiGantiUangReview,
}
