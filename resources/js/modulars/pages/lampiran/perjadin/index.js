const {
  LampiranPerjadinPerubahan,
  LampiranPerjadinPerubahanCreate,
  LampiranPerjadinPerubahanEdit,
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,
} = require('./perubahan/index')

const LampiranPerjadin = resolve => {
  require.ensure(
    ['../../../../components/pages/lampiran/perjadin/Index'],
    () => {
      resolve(require('../../../../components/pages/lampiran/perjadin/Index'))
    }, 'pages/lampiran/perjadin'
  )
}

module.exports = {
  LampiranPerjadin,
  LampiranPerjadinPerubahan,
  LampiranPerjadinPerubahanCreate,
  LampiranPerjadinPerubahanEdit,
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,
}
