const LampiranHonorDetailEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/lampiran/honor/detail/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/lampiran/honor/detail/edit/Index'))
    }, 'pages/lampiran/honor/detail/edit'
  )
}

module.exports = {
  LampiranHonorDetailEdit,
}
