const VerifikasiHonorReview = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/honor/review/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/honor/review/Index'))
    }, 'pages/verifikasi/honor/review'
  )
}

module.exports = {
  VerifikasiHonorReview,
}
