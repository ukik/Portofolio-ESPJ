const StandarPerjadinHarianLuarNegeriCreate = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/harian/luar-negeri/create/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/harian/luar-negeri/create/Index'))
    }, 'pages/standar/perjadin/harian/luar-negeri/create'
  )
}

module.exports = {
  StandarPerjadinHarianLuarNegeriCreate,
}
