const LampiranHonorDetailCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/lampiran/honor/detail/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/lampiran/honor/detail/create/Index'))
    }, 'pages/lampiran/honor/detail/create'
  )
}

module.exports = {
  LampiranHonorDetailCreate,
}
