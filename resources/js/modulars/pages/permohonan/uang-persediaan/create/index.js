const PermohonanUangPersediaanCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/permohonan/uang-persediaan/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/permohonan/uang-persediaan/create/Index'))
    }, 'pages/permohonan/uang-persediaan/create'
  )
}

module.exports = {
  PermohonanUangPersediaanCreate,
}
