const PermohonanGantiUangEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/permohonan/ganti-uang/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/permohonan/ganti-uang/edit/Index'))
    }, 'pages/permohonan/ganti-uang/create'
  )
}

module.exports = {
  PermohonanGantiUangEdit,
}