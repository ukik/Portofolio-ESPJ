const { VerifikasiSPJReview } = require('./review/index')

const VerifikasiSPJ = resolve => {
  require.ensure(
    ['../../../../components/pages/verifikasi/spj/Index'],
    () => {
      resolve(require('../../../../components/pages/verifikasi/spj/Index'))
    }, 'pages/verifikasi/spj'
  )
}

module.exports = {
  VerifikasiSPJReview,
  VerifikasiSPJ,
}
