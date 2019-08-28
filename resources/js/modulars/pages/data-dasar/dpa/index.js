const { DataDasarDPARincian } = require('./rincian/index')
const { DataDasarDPAEdit } = require('./edit/index')

const DataDasarDPA = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/dpa/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/dpa/Index'))
    }, 'pages/data-dasar/dpa'
  )
}

module.exports = {
  DataDasarDPA,
  DataDasarDPARincian,
  DataDasarDPAEdit,
}
