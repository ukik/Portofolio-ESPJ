const StandarPerjadinRepresentatifEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/representatif/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/representatif/edit/Index'))
    }, 'pages/standar/perjadin/representatif/edit'
  )
}

module.exports = {
  StandarPerjadinRepresentatifEdit,
}
