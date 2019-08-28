const { DataDasarKPACreate } = require('./create/index')
const { DataDasarKPAEdit } = require('./edit/index')

const DataDasarKPA = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/kpa/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/kpa/Index'))
    }, 'pages/data-dasar/kpa'
  )
}

module.exports = {
  DataDasarKPA,
  DataDasarKPACreate,
  DataDasarKPAEdit,
}
