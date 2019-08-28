const { DataDasarRekananCreate } = require('./create/index')
const { DataDasarRekananEdit } = require('./edit/index')

const DataDasarRekanan = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/rekanan/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/rekanan/Index'))
    }, 'pages/data-dasar/rekanan'
  )
}

module.exports = {
  DataDasarRekanan,
  DataDasarRekananCreate,
  DataDasarRekananEdit,
}
