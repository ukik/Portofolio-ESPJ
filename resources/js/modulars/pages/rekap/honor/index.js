const RekapHonor = resolve => {
  require.ensure(
    ['../../../../components/pages/rekap/honor/Index'],
    () => {
      resolve(require('../../../../components/pages/rekap/honor/Index'))
    }, 'pages/rekap/honor'
  )
}

module.exports = {
  RekapHonor
}
