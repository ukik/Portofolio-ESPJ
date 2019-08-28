const LampiranHonorEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/honor/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/honor/edit/Index'))
    }, 'pages/lampiran/honor/edit'
  )
}

module.exports = {
  LampiranHonorEdit,
}
