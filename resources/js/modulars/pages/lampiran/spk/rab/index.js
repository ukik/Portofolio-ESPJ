const LampiranSPKRAB = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/spk/rab/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/spk/rab/Index'))
    }, 'pages/lampiran/spk/rab'
  )
}

module.exports = {
  LampiranSPKRAB,
}
