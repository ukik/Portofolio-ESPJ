const PermohonanGantiUangCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/permohonan/ganti-uang/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/permohonan/ganti-uang/create/Index'))
    }, 'pages/permohonan/ganti-uang/create'
  )
}

module.exports = {
  PermohonanGantiUangCreate,
}