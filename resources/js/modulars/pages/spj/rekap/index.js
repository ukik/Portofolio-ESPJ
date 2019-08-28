const { SpjRekapEdit } = require('./edit/index')
const { SpjRekapCreate } = require('./create/index')

const SpjRekap = resolve => {
  require.ensure(
    ['../../../../components/pages/spj/rekap/Index'],
    () => {
      resolve(require('../../../../components/pages/spj/rekap/Index'))
    }, 'pages/spj/rekap'
  )
}

module.exports = {
  SpjRekap,
  SpjRekapEdit,
  SpjRekapCreate,
}
