const StandarPerjadinHonorEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/honor/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/honor/edit/Index'))
    }, 'pages/standar/perjadin/honor/edit'
  )
}

module.exports = {
  StandarPerjadinHonorEdit,
}
