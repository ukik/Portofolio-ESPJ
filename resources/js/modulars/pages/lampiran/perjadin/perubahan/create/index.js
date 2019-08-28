const LampiranPerjadinPerubahanCreate = resolve => {
  require.ensure(
    ['../../../../../../components/pages/lampiran/perjadin/perubahan/create/Index'],
    () => {
      resolve(require('../../../../../../components/pages/lampiran/perjadin/perubahan/create/Index'))
    }, 'pages/lampiran/perjadin/perubahan/create'
  )
}

module.exports = {
  LampiranPerjadinPerubahanCreate,
}
