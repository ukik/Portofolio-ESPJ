const { StandarPerjadinHarianLuarNegeriCreate } = require('./create/index')
const { StandarPerjadinHarianLuarNegeriEdit } = require('./edit/index')

const StandarPerjadinHarianLuarNegeri = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/harian/luar-negeri/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/harian/luar-negeri/Index'))
    }, 'pages/standar/perjadin/harian/luar-negeri'
  )
}

module.exports = {
  StandarPerjadinHarianLuarNegeri,
  StandarPerjadinHarianLuarNegeriCreate,
  StandarPerjadinHarianLuarNegeriEdit,  
}
