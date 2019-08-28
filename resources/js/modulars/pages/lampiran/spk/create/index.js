const LampiranSPKCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/spk/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/spk/create/Index'))
    }, 'pages/lampiran/spk/create'
  )
}

module.exports = {
  LampiranSPKCreate,
}
