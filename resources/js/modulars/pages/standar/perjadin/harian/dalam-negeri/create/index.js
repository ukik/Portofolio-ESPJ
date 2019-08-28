const StandarPerjadinHarianDalamNegeriCreate = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/harian/dalam-negeri/create/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/harian/dalam-negeri/create/Index'))
    }, 'pages/standar/perjadin/harian/dalam-negeri/create'
  )
}

module.exports = {
  StandarPerjadinHarianDalamNegeriCreate,
}
