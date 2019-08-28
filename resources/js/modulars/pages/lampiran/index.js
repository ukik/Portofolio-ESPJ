const {
  LampiranPerjadin,
  LampiranPerjadinPerubahan,
  LampiranPerjadinPerubahanCreate,
  LampiranPerjadinPerubahanEdit,
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,  
  LampiranPerjadinPerubahanDetailCreate,
} = require('./perjadin/index')

const {
  LampiranHonor,
  LampiranHonorCreate,
  LampiranHonorEdit,
  LampiranHonorDetail,
  LampiranHonorDetailCreate,
  LampiranHonorDetailEdit,
} = require('./honor/index')

const {
  LampiranSPK,
  LampiranSPKCreate,
  LampiranSPKEdit,
  LampiranSPKRAB,
} = require('./spk/index')

module.exports = {
  LampiranPerjadin,
  LampiranPerjadinPerubahan,
  LampiranPerjadinPerubahanCreate,
  LampiranPerjadinPerubahanEdit,
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,
  LampiranHonor,
  LampiranHonorCreate,
  LampiranHonorEdit,
  LampiranHonorDetail,
  LampiranHonorDetailCreate,
  LampiranHonorDetailEdit,
  LampiranSPK,
  LampiranSPKCreate,
  LampiranSPKEdit,
  LampiranSPKRAB,
}
