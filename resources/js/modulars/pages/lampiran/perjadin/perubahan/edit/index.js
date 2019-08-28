const LampiranPerjadinPerubahanEdit = resolve => {
  require.ensure(
    ['../../../../../../components/pages/lampiran/perjadin/perubahan/edit/Index'],
    () => {
      resolve(require('../../../../../../components/pages/lampiran/perjadin/perubahan/edit/Index'))
    }, 'pages/lampiran/perjadin/perubahan/edit'
  )
}

module.exports = {
  LampiranPerjadinPerubahanEdit,
}
