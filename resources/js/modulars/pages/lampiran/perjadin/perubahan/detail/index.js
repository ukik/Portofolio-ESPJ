const { LampiranPerjadinPerubahanDetailBiaya } = require('./biaya/index')
const { LampiranPerjadinPerubahanDetailEdit } = require('./edit/index')
const { LampiranPerjadinPerubahanDetailCreate } = require('./create/index')

const LampiranPerjadinPerubahanDetail = resolve => {
  require.ensure(
    ['../../../../../../components/pages/lampiran/perjadin/perubahan/detail/Index'],
    () => {
      resolve(require('../../../../../../components/pages/lampiran/perjadin/perubahan/detail/Index'))
    }, 'pages/lampiran/perjadin/perubahan/detail'
  )
}

module.exports = {
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,
}
