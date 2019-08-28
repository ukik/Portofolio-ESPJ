const LampiranPerjadinCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/perjadin/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/perjadin/create/Index'))
    }, 'pages/lampiran/perjadin/create'
  )
}

module.exports = {
  LampiranPerjadinCreate,
}
