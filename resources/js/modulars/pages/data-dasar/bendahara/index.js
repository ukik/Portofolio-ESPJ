const { DataDasarBendaharaCreate } = require('./create/index')
const { DataDasarBendaharaEdit } = require('./edit/index')

const DataDasarBendahara = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/bendahara/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/bendahara/Index'))
    }, 'pages/data-dasar/bendahara'
  )
}

module.exports = {
  DataDasarBendahara,
  DataDasarBendaharaCreate,
  DataDasarBendaharaEdit,
}

