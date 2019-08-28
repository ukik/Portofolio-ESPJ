const { SpjBerkasCreate } = require('./create/index')

const SpjBerkas = resolve => {
  require.ensure(
    ['../../../../components/pages/spj/berkas/Index'],
    () => {
      resolve(require('../../../../components/pages/spj/berkas/Index'))
    }, 'pages/spj/berkas'
  )
}

module.exports = {
  SpjBerkas,
  SpjBerkasCreate,
}
