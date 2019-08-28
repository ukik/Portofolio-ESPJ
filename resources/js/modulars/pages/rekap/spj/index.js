const RekapSpj = resolve => {
  require.ensure(
    ['../../../../components/pages/rekap/spj/Index'],
    () => {
      resolve(require('../../../../components/pages/rekap/spj/Index'))
    }, 'pages/rekap/spj'
  )
}

module.exports = {
  RekapSpj
}
