const StandarPerjadinHarianDalamNegeriEdit = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/harian/dalam-negeri/edit/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/harian/dalam-negeri/edit/Index'))
    }, 'pages/standar/perjadin/harian/dalam-negeri/edit'
  )
}

module.exports = {
  StandarPerjadinHarianDalamNegeriEdit,
}
