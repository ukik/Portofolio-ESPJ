const { 
  VerifikasiGantiUang, 
  VerifikasiGantiUangReview 
} = require('./ganti-uang/index')

const { 
  VerifikasiHonor, 
  VerifikasiHonorReview 
} = require('./honor/index')

const {
  VerifikasiPerjadin,
  VerifikasiPerjadinPerubahan,
  VerifikasiPerjadinReview
} = require('./perjadin/index')

const { 
  VerifikasiSPJ,
  VerifikasiSPJReview,
} = require('./spj/index')

const {
  VerifikasiSPK,
  VerifikasiSPKPerubahan,
  VerifikasiSPKReview,
} = require('./spk/index')

const Verifikasi = resolve => {
  require.ensure(
    ['../../../components/pages/verifikasi/Index'],
    () => {
      resolve(require('../../../components/pages/verifikasi/Index'))
    }, 'pages/verifikasi'
  )
}

module.exports = {
  Verifikasi,
  VerifikasiGantiUang, VerifikasiGantiUangReview,
  VerifikasiHonor, VerifikasiHonorReview,
  VerifikasiPerjadin, VerifikasiPerjadinPerubahan, VerifikasiPerjadinReview,
  VerifikasiSPJ, VerifikasiSPJReview,
  VerifikasiSPK,
  VerifikasiSPKPerubahan, VerifikasiSPKReview 
}
