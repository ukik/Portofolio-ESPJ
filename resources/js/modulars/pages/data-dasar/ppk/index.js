const { DataDasarPPKCreate } = require('./create/index')
const { DataDasarPPKEdit } = require('./edit/index')

const DataDasarPPK = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/ppk/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/ppk/Index'))
    }, 'pages/data-dasar/ppk'
  )
}

module.exports = {
  DataDasarPPK,
  DataDasarPPKCreate,
  DataDasarPPKEdit,
}
