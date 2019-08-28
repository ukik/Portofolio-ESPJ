const StandarPerjadinHonorCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/honor/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/honor/create/Index'))
    }, 'pages/standar/perjadin/honor/create'
  )
}

module.exports = {
  StandarPerjadinHonorCreate,
}
