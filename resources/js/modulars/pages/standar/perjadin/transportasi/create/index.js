const StandarPerjadinTransportasiCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/transportasi/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/transportasi/create/Index'))
    }, 'pages/standar/perjadin/transportasi/create'
  )
}

module.exports = {
  StandarPerjadinTransportasiCreate,
}
