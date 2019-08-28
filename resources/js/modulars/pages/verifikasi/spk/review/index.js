const VerifikasiSPKReview = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/spk/review/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/spk/review/Index'))
    }, 'pages/verifikasi/spk/review'
  )
}

module.exports = {
  VerifikasiSPKReview,
}
