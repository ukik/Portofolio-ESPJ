const SpjRekapEdit = resolve => {
  require.ensure(
    ['../../../../../components/pages/spj/rekap/edit/Index'],
    () => {
      resolve(require('../../../../../components/pages/spj/rekap/edit/Index'))
    }, 'pages/spj/rekap/edit'
  )
}

module.exports = {
  SpjRekapEdit,
}
