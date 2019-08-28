const SpjBerkasCreate = resolve => {
  require.ensure(
    ['../../../../../components/pages/spj/berkas/create/Index'],
    () => {
      resolve(require('../../../../../components/pages/spj/berkas/create/Index'))
    }, 'pages/spj/berkas/create'
  )
}

module.exports = {
  SpjBerkasCreate,
}
