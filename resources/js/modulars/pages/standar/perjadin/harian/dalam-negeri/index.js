const { StandarPerjadinHarianDalamNegeriCreate } = require('./create/index')
const { StandarPerjadinHarianDalamNegeriEdit } = require('./edit/index')

const StandarPerjadinHarianDalamNegeri = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/harian/dalam-negeri/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/harian/dalam-negeri/Index'))
    }, 'pages/standar/perjadin/harian/dalam-negeri'
  )
}

module.exports = {
  StandarPerjadinHarianDalamNegeri,
  StandarPerjadinHarianDalamNegeriCreate,
  StandarPerjadinHarianDalamNegeriEdit,
}
