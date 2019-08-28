const StandarPerjadinHarianLuarNegeriEdit = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/harian/luar-negeri/edit/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/harian/luar-negeri/edit/Index'))
    }, 'pages/standar/perjadin/harian/luar-negeri/edit'
  )
}

module.exports = {
  StandarPerjadinHarianLuarNegeriEdit,
}
