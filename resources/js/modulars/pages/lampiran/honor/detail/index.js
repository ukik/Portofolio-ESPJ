const { LampiranHonorDetailCreate } = require('./create/index')
const { LampiranHonorDetailEdit } = require('./edit/index')

const LampiranHonorDetail = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/honor/detail/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/honor/detail/Index'))
    }, 'pages/lampiran/honor/detail'
  )
}

module.exports = {
  LampiranHonorDetail,
  LampiranHonorDetailCreate,
  LampiranHonorDetailEdit,
}
