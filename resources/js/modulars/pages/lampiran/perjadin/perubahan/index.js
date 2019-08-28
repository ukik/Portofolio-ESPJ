const {
  LampiranPerjadinPerubahanCreate,
} = require('./create/index')

const {
  LampiranPerjadinPerubahanEdit,
} = require('./edit/index')

const {
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,
} = require('./detail/index')


const LampiranPerjadinPerubahan = resolve => {
  require.ensure(
    ['../../../../../components/pages/lampiran/perjadin/perubahan/Index'],
    () => {
      resolve(require('../../../../../components/pages/lampiran/perjadin/perubahan/Index'))
    }, 'pages/lampiran/perjadin/perubahan'
  )
}

module.exports = {
  LampiranPerjadinPerubahan,
  LampiranPerjadinPerubahanCreate,
  LampiranPerjadinPerubahanEdit,
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,  
}
