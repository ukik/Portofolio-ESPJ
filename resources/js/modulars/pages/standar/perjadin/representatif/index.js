const { StandarPerjadinRepresentatifCreate } = require('./create/index')
const { StandarPerjadinRepresentatifEdit } = require('./edit/index')

const StandarPerjadinRepresentatif = resolve => {
  require.ensure(
    ['../../../../../components/pages/standar/perjadin/representatif/Index'],
    () => {
      resolve(require('../../../../../components/pages/standar/perjadin/representatif/Index'))
    }, 'pages/standar/perjadin/representatif'
  )
}

module.exports = {
  StandarPerjadinRepresentatif,
  StandarPerjadinRepresentatifCreate,
  StandarPerjadinRepresentatifEdit,  
}
