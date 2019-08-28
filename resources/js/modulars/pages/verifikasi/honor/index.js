const { VerifikasiHonorReview } = require('./review/index')

const VerifikasiHonor = resolve => {
  require.ensure(
    ['../../../../components/pages/verifikasi/honor/Index'],
    () => {
      resolve(require('../../../../components/pages/verifikasi/honor/Index'))
    }, 'pages/verifikasi/honor'
  )
}

module.exports = {
  VerifikasiHonor,
  VerifikasiHonorReview,
}
