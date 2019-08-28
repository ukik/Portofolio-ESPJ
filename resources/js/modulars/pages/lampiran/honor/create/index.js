const LampiranHonorCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/honor/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/honor/create/Index'))
    }, 'pages/lampiran/honor/create'
  )
}

module.exports = {
  LampiranHonorCreate,
}
