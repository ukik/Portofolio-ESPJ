const LampiranSPKEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/spk/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/spk/edit/Index'))
    }, 'pages/lampiran/spk/edit'
  )
}

module.exports = {
  LampiranSPKEdit,
}
