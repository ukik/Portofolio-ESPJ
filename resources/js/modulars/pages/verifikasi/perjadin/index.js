const { VerifikasiPerjadinPerubahan } = require('./perubahan/index')
const { VerifikasiPerjadinReview } = require('./review/index')

const VerifikasiPerjadin = resolve => {
  require.ensure(
    ['../../../../components/pages/verifikasi/perjadin/Index'],
    () => {
      resolve(require('../../../../components/pages/verifikasi/perjadin/Index'))
    }, 'pages/verifikasi/perjadin'
  )
}

module.exports = {
  VerifikasiPerjadin,
  VerifikasiPerjadinPerubahan,
  VerifikasiPerjadinReview,
}
