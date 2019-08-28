const LampiranPerjadinPerubahanDetailCreate = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/lampiran/perjadin/perubahan/detail/create/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/lampiran/perjadin/perubahan/detail/create/Index'))
    }, 'pages/lampiran/perjadin/perubahan/detail/create'
  )
}

module.exports = {
  LampiranPerjadinPerubahanDetailCreate,
}
