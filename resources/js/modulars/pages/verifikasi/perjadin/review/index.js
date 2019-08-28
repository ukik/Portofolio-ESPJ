const VerifikasiPerjadinReview = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/perjadin/review/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/perjadin/review/Index'))
    }, 'pages/verifikasi/perjadin/review'
  )
}

module.exports = {
  VerifikasiPerjadinReview,
}
