const { StandarPerjadinHonorCreate } = require('./create/index')
const { StandarPerjadinHonorEdit } = require('./edit/index')

const StandarPerjadinHonor = resolve => {
  require.ensure(
    ['../../../../../components/pages/standar/perjadin/honor/Index'],
    () => {
      resolve(require('../../../../../components/pages/standar/perjadin/honor/Index'))
    }, 'pages/standar/perjadin/honor'
  )
}

module.exports = {
  StandarPerjadinHonor,
  StandarPerjadinHonorCreate,
  StandarPerjadinHonorEdit,
}
