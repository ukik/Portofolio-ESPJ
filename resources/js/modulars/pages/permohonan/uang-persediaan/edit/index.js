const PermohonanUangPersediaanEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/permohonan/uang-persediaan/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/permohonan/uang-persediaan/edit/Index'))
    }, 'pages/permohonan/uang-persediaan/edit'
  )
}

module.exports = {
  PermohonanUangPersediaanEdit,
}
