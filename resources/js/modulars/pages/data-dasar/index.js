const {
  DataDasarDPA,
  DataDasarDPARincian,
  DataDasarDPAEdit
} = require('./dpa/index')

const {
  DataDasarBidang,
  DataDasarBidangEdit,
  DataDasarBidangCreate,  
} = require('./bidang/index')

const {
  DataDasarPegawai,
  DataDasarPegawaiCreate,
  DataDasarPegawaiEdit,
} = require('./pegawai/index')

const {
  DataDasarPemimpin,
  DataDasarPemimpinCreate,
  DataDasarPemimpinEdit,
} = require('./pemimpin/index')

const {
  DataDasarKPA,
  DataDasarKPACreate,
  DataDasarKPAEdit,  
} = require('./kpa/index')

const {
  DataDasarPPTK,
  DataDasarPPTKCreate,
  DataDasarPPTKEdit,  
} = require('./pptk/index')

const {
  DataDasarPPK,
  DataDasarPPKCreate,
  DataDasarPPKEdit,  
} = require('./ppk/index')

const {
  DataDasarBendahara,
  DataDasarBendaharaCreate,
  DataDasarBendaharaEdit,
} = require('./bendahara/index')

const {
  DataDasarPenghubung,
  DataDasarPenghubungCreate,
  DataDasarPenghubungEdit,  
} = require('./penghubung/index')

const {
  DataDasarRekanan,
  DataDasarRekananCreate,
  DataDasarRekananEdit,  
} = require('./rekanan/index')

const {
  DataDasarLokasiDalamNegeri,
  DataDasarLokasiDalamNegeriCreate,
  DataDasarLokasiDalamNegeriEdit,  
} = require('./lokasi/dalam-negeri/index')

const {
  DataDasarLokasiLuarNegeri,
  DataDasarLokasiLuarNegeriCreate,
  DataDasarLokasiLuarNegeriEdit,  
} = require('./lokasi/luar-negeri/index')

const DataDasar = resolve => {
  require.ensure(
    ['../../../components/pages/data-dasar/Index'],
    () => {
      resolve(require('../../../components/pages/data-dasar/Index'))
    }, 'pages/data-dasar'
  )
}

module.exports = {
  components: {
    DataDasar,
  },
  
  DataDasar,
  DataDasarDPA,
  DataDasarDPARincian,
  DataDasarDPAEdit,

  DataDasarBidang,
  DataDasarBidangEdit,
  DataDasarBidangCreate,  

  DataDasarPegawai,
  DataDasarPegawaiCreate,
  DataDasarPegawaiEdit,

  DataDasarPemimpin,
  DataDasarPemimpinCreate,
  DataDasarPemimpinEdit,

  DataDasarKPA,
  DataDasarKPACreate,
  DataDasarKPAEdit,

  DataDasarPPTK,
  DataDasarPPTKCreate,
  DataDasarPPTKEdit,

  DataDasarPPK,
  DataDasarPPKCreate,
  DataDasarPPKEdit,

  DataDasarBendahara,
  DataDasarBendaharaCreate,
  DataDasarBendaharaEdit,

  DataDasarPenghubung,
  DataDasarPenghubungCreate,
  DataDasarPenghubungEdit,

  DataDasarRekanan,
  DataDasarRekananCreate,
  DataDasarRekananEdit,

  DataDasarLokasiDalamNegeri,
  DataDasarLokasiDalamNegeriCreate,
  DataDasarLokasiDalamNegeriEdit,

  DataDasarLokasiLuarNegeri,
  DataDasarLokasiLuarNegeriCreate,
  DataDasarLokasiLuarNegeriEdit,  
}
