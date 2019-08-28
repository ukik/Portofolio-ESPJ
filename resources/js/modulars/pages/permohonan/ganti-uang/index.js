const { PermohonanGantiUangCreate } = require('./create/index')
const { PermohonanGantiUangEdit } = require('./edit/index')
const { PermohonanGantiUangAliranKas } = require('./aliran-kas/index')

const PermohonanGantiUang = resolve => {
  require.ensure(
    ['../../../../components/pages/permohonan/ganti-uang/Index'],
    () => {
      resolve(require('../../../../components/pages/permohonan/ganti-uang/Index'))
    }, 'pages/permohonan/ganti-uang'
  )
}

module.exports = {
  PermohonanGantiUang,
  PermohonanGantiUangCreate,
  PermohonanGantiUangEdit,
  PermohonanGantiUangAliranKas,
}
