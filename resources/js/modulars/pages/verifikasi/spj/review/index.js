const VerifikasiSPJReview = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/spj/review/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/spj/review/Index'))
    }, 'pages/verifikasi/spk/review'
  )
}


module.exports = {
  VerifikasiSPJReview,
}
