const SpjRekapCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/spj/rekap/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/spj/rekap/create/Index'))
    }, 'pages/spj/rekap/create'
  )
}

module.exports = {
  SpjRekapCreate,
}
