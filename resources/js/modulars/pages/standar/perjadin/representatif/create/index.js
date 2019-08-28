const StandarPerjadinRepresentatifCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/representatif/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/representatif/create/Index'))
    }, 'pages/standar/perjadin/representatif/create'
  )
}

module.exports = {
  StandarPerjadinRepresentatifCreate,
}
