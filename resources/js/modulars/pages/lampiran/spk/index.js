const {
  LampiranSPKCreate
} = require('./create/index')
const {
  LampiranSPKEdit
} = require('./edit/index')
const {
  LampiranSPKRAB
} = require('./rab/index')

const LampiranSPK = resolve => {
  require.ensure(
    ['../../../../components/pages/lampiran/spk/Index'],
    () => {
      resolve(require('../../../../components/pages/lampiran/spk/Index'))
    }, 'pages/lampiran/spk'
  )
}

module.exports = {
  LampiranSPK,
  LampiranSPKCreate,
  LampiranSPKEdit,
  LampiranSPKRAB,
}
