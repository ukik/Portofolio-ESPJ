const { StandarPerjadinTransportasiCreate } = require('./create/index')
const { StandarPerjadinTransportasiEdit } = require('./edit/index')

const StandarPerjadinTransportasi = resolve => {
  require.ensure(
    ['../../../../../components/pages/standar/perjadin/transportasi/Index'],
    () => {
      resolve(require('../../../../../components/pages/standar/perjadin/transportasi/Index'))
    }, 'pages/standar/perjadin/transportasi'
  )
}

module.exports = {
  StandarPerjadinTransportasi,
  StandarPerjadinTransportasiCreate,
  StandarPerjadinTransportasiEdit,
}
