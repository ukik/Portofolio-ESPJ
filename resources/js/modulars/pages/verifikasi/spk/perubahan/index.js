const VerifikasiSPKPerubahan = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/spk/perubahan/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/spk/perubahan/Index'))
    }, 'pages/verifikasi/spk/perubahan'
  )
}

module.exports = {
  VerifikasiSPKPerubahan,
}
