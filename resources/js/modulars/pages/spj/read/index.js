const SpjRead = resolve => {
  require.ensure(
    ['../../../../components/pages/spj/read/Index'],
    () => {
      resolve(require('../../../../components/pages/spj/read/Index'))
    }, 'pages/spj/read'
  )
}

module.exports = {
  SpjRead,
}
