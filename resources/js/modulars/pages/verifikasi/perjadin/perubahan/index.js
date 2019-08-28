const VerifikasiPerjadinPerubahan = resolve => {
  require.ensure(
    ['../../../../../components/pages/verifikasi/perjadin/perubahan/Index'],
    () => {
      resolve(require('../../../../../components/pages/verifikasi/perjadin/perubahan/Index'))
    }, 'pages/verifikasi/perjadin/perubahan'
  )
}

module.exports = {
  VerifikasiPerjadinPerubahan,
}
