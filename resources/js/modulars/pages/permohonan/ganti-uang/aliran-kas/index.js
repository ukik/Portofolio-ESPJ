const PermohonanGantiUangAliranKas = resolve => {
  require.ensure(
    ['../../../../../components/pages/permohonan/ganti-uang/aliran-kas/Index'],
    () => {
      resolve(require('../../../../../components/pages/permohonan/ganti-uang/aliran-kas/Index'))
    }, 'pages/permohonan/ganti-uang/aliran-kas'
  )
}


module.exports = {
  PermohonanGantiUangAliranKas,
}