const RekapPerjadin = resolve => {
  require.ensure(
    ['../../../../components/pages/rekap/perjadin/Index'],
    () => {
      resolve(require('../../../../components/pages/rekap/perjadin/Index'))
    }, 'pages/rekap/perjadin'
  )
}

module.exports = {
  RekapPerjadin
}
