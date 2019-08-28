const { DataDasarPemimpinCreate } = require('./create/index')
const { DataDasarPemimpinEdit } = require('./edit/index')

const DataDasarPemimpin = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/pemimpin/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/pemimpin/Index'))
    }, 'pages/data-dasar/pemimpin'
  )
}

module.exports = {
  DataDasarPemimpin,
  DataDasarPemimpinCreate,
  DataDasarPemimpinEdit,
}
