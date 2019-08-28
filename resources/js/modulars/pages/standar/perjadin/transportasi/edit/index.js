const StandarPerjadinTransportasiEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/transportasi/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/transportasi/edit/Index'))
    }, 'pages/standar/perjadin/transportasi/edit'
  )
}

module.exports = {
  StandarPerjadinTransportasiEdit,
}
