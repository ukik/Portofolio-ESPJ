const { SpjRekap, SpjRekapEdit, SpjRekapCreate } = require('./rekap/index')
const { SpjBerkas, SpjBerkasCreate } = require('./berkas/index')
const { SpjRead } = require('./read/index')

const Spj = resolve => {
  require.ensure(
    ['../../../components/pages/spj/Index'],
    () => {
      resolve(require('../../../components/pages/spj/Index'))
    }, 'pages/spj'
  )
}

module.exports = {
  Spj,
  SpjRekap,
  SpjRekapEdit,
  SpjRekapCreate,
  SpjBerkas,
  SpjBerkasCreate,
  SpjRead,
}
