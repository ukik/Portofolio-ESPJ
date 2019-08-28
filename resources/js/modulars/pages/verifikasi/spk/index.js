const { VerifikasiSPKPerubahan } = require('./perubahan/index')
const { VerifikasiSPKReview } = require('./review/index')

const VerifikasiSPK = resolve => {
  require.ensure(
    ['../../../../components/pages/verifikasi/spk/Index'],
    () => {
      resolve(require('../../../../components/pages/verifikasi/spk/Index'))
    }, 'pages/verifikasi/spk'
  )
}

module.exports = {
  VerifikasiSPK,
  VerifikasiSPKPerubahan,
  VerifikasiSPKReview,
}
