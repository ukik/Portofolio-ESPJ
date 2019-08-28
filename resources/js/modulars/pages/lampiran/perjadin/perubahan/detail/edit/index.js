const LampiranPerjadinPerubahanDetailEdit = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/lampiran/perjadin/perubahan/detail/edit/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/lampiran/perjadin/perubahan/detail/edit/Index'))
    }, 'pages/lampiran/perjadin/perubahan/detail/edit'
  )
}

module.exports = {
  LampiranPerjadinPerubahanDetailEdit,
}
