const {
  StandarPerjadinHarianDalamNegeri,
  StandarPerjadinHarianDalamNegeriCreate,
  StandarPerjadinHarianDalamNegeriEdit,  
} = require('./perjadin/harian/dalam-negeri/index')

const {
  StandarPerjadinHarianLuarNegeri,
  StandarPerjadinHarianLuarNegeriCreate,  
  StandarPerjadinHarianLuarNegeriEdit,
} = require('./perjadin/harian/luar-negeri/index')

const {
  StandarPerjadinHotelDalamWilayah,
  StandarPerjadinHotelDalamWilayahCreate,
  StandarPerjadinHotelDalamWilayahEdit,
} = require('./perjadin/hotel/dalam-wilayah/index')

const {
  StandarPerjadinHotelLuarWilayah,
  StandarPerjadinHotelLuarWilayahCreate,
  StandarPerjadinHotelLuarWilayahEdit,
} = require('./perjadin/hotel/luar-wilayah/index')

const {
  StandarPerjadinRepresentatif,
  StandarPerjadinRepresentatifCreate,
  StandarPerjadinRepresentatifEdit,
} = require('./perjadin/representatif/index')

const {
  StandarPerjadinTransportasi,
  StandarPerjadinTransportasiCreate,
  StandarPerjadinTransportasiEdit,
} = require('./perjadin/transportasi/index')

const {
  StandarPerjadinHonor,
  StandarPerjadinHonorCreate,
  StandarPerjadinHonorEdit,
} = require('./perjadin/honor/index')

module.exports = {
  StandarPerjadinHarianDalamNegeri,
  StandarPerjadinHarianDalamNegeriCreate,
  StandarPerjadinHarianDalamNegeriEdit,
  
  StandarPerjadinHotelDalamWilayah,
  StandarPerjadinHotelDalamWilayahCreate,
  StandarPerjadinHotelDalamWilayahEdit,

  StandarPerjadinHarianLuarNegeri,
  StandarPerjadinHarianLuarNegeriCreate,
  StandarPerjadinHarianLuarNegeriEdit,

  StandarPerjadinRepresentatif,
  StandarPerjadinRepresentatifCreate,
  StandarPerjadinRepresentatifEdit,

  StandarPerjadinTransportasi,
  StandarPerjadinTransportasiCreate,
  StandarPerjadinTransportasiEdit,

  StandarPerjadinHonor,
  StandarPerjadinHonorCreate,
  StandarPerjadinHonorEdit,

  StandarPerjadinHotelLuarWilayah,
  StandarPerjadinHotelLuarWilayahCreate,
  StandarPerjadinHotelLuarWilayahEdit,
}
