const { PermohonanUangPersediaanCreate } = require('./create/index')
const { PermohonanUangPersediaanEdit } = require('./edit/index')

const PermohonanUangPersediaan = resolve => {
  require.ensure(
    ['../../../../components/pages/permohonan/uang-persediaan/Index'],
    () => {
      resolve(require('../../../../components/pages/permohonan/uang-persediaan/Index'))
    }, 'pages/permohonan/uang-persediaan'
  )
}

module.exports = {
  PermohonanUangPersediaan,
  PermohonanUangPersediaanCreate,
  PermohonanUangPersediaanEdit,
}
