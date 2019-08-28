const {
  LampiranHonorCreate
} = require('./create/index')

const {
  LampiranHonorEdit
} = require('./edit/index')

const {
  LampiranHonorDetail, LampiranHonorDetailCreate, LampiranHonorDetailEdit
} = require('./detail/index')

const LampiranHonor = resolve => {
  require.ensure(
    ['../../../../components/pages/lampiran/honor/Index'],
    () => {
      resolve(require('../../../../components/pages/lampiran/honor/Index'))
    }, 'pages/lampiran/honor'
  )
}

module.exports = {
  LampiranHonor,
  LampiranHonorCreate,
  LampiranHonorEdit,
  LampiranHonorDetail,
  LampiranHonorDetailCreate, 
  LampiranHonorDetailEdit,
}
