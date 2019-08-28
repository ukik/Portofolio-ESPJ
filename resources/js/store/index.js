import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = require('./global/state')
const getters = require('./global/getters')
const mutations = require('./global/mutations')
const actions = require('./global/actions')

const data_dasar_bendahara = require('./modules/data-dasar/bendahara/index')
const data_dasar_bidang = require('./modules/data-dasar/bidang/index')
const data_dasar_dpa = require('./modules/data-dasar/dpa/index')
const data_dasar_kpa = require('./modules/data-dasar/kpa/index')
const data_dasar_lokasi_dalam_negeri = require('./modules/data-dasar/lokasi/dalam-negeri/index')
const data_dasar_lokasi_luar_negeri = require('./modules/data-dasar/lokasi/luar-negeri/index')
const data_dasar_pegawai = require('./modules/data-dasar/pegawai/index')
const data_dasar_pimpinan = require('./modules/data-dasar/pemimpin/index')
const data_dasar_penghubung = require('./modules/data-dasar/penghubung/index')
const data_dasar_ppk = require('./modules/data-dasar/ppk/index')
const data_dasar_pptk = require('./modules/data-dasar/pptk/index')
const data_dasar_rekanan = require('./modules/data-dasar/rekanan/index')

const pengaturan_aliran_kas = require('./modules/pengaturan/aliran-kas/index')
const pengaturan_berkas = require('./modules/pengaturan/berkas/index')
const pengaturan_honor = require('./modules/pengaturan/honor/index')
const pengaturan_nomor_surat = require('./modules/pengaturan/nomor-surat/index')
const pengaturan_pajak = require('./modules/pengaturan/pajak/index')
const pengaturan_tahun = require('./modules/pengaturan/tahun/index')
const pengaturan_user = require('./modules/pengaturan/user/index')

const spj = require('./modules/spj/index')
const spj_berkas = require('./modules/spj/berkas/index')
const spj_rekap = require('./modules/spj/rekap/index')

const verifikasi_spj = require('./modules/verifikasi/spj/index')
const verifikasi_ganti_uang = require('./modules/verifikasi/ganti-uang/index')
const verifikasi_honor = require('./modules/verifikasi/honor/index')
const verifikasi_perjadin = require('./modules/verifikasi/perjadin/index')
const verifikasi_spk = require('./modules/verifikasi/spk/index')

const standar_perjadin_harian_dalam_negeri = require('./modules/standar/perjadin/harian/dalam-negeri/index')
const standar_perjadin_harian_luar_negeri = require('./modules/standar/perjadin/harian/luar-negeri/index')
const standar_perjadin_honor = require('./modules/standar/perjadin/honor/index')
const standar_perjadin_hotel_dalam_wilayah = require('./modules/standar/perjadin/hotel/dalam-wilayah/index')
const standar_perjadin_hotel_luar_wilayah = require('./modules/standar/perjadin/hotel/luar-wilayah/index')
const standar_perjadin_representatif = require('./modules/standar/perjadin/representatif/index')
const standar_perjadin_transportasi = require('./modules/standar/perjadin/transportasi/index')

const lampiran_honor = require('./modules/lampiran/honor/index')
const lampiran_perjadin = require('./modules/lampiran/perjadin/index')
const lampiran_perjadin_detail = require('./modules/lampiran/perjadin/detail/index')
const lampiran_spk = require('./modules/lampiran/spk/index')

const permohonan_ganti_uang = require('./modules/permohonan/ganti-uang/index')
const permohonan_uang_persediaan = require('./modules/permohonan/uang-persediaan/index')

const login = require('./modules/login/index')

const rekap_spj = require('./modules/rekap/spj/index')
const rekap_honor = require('./modules/rekap/honor/index')
const rekap_perjadin = require('./modules/rekap/perjadin/index')


const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store ({
    ...state,
    ...getters,
    ...mutations,
    ...actions,    
    modules: {
        login,
        
        data_dasar_bendahara,
        data_dasar_bidang,
        data_dasar_dpa,
        data_dasar_kpa,
        data_dasar_lokasi_dalam_negeri,
        data_dasar_lokasi_luar_negeri,
        data_dasar_pegawai,
        data_dasar_pimpinan,
        data_dasar_penghubung,
        data_dasar_ppk,
        data_dasar_pptk,
        data_dasar_rekanan,

        pengaturan_aliran_kas,
        pengaturan_berkas,
        pengaturan_honor,
        pengaturan_nomor_surat,
        pengaturan_pajak,
        pengaturan_tahun,
        pengaturan_user,

        spj,
        spj_berkas,
        spj_rekap,

        verifikasi_spj,
        verifikasi_ganti_uang,
        verifikasi_honor,
        verifikasi_perjadin,
        verifikasi_spk,

        standar_perjadin_harian_dalam_negeri,
        standar_perjadin_harian_luar_negeri,
        standar_perjadin_honor,
        standar_perjadin_hotel_dalam_wilayah,
        standar_perjadin_hotel_luar_wilayah,
        standar_perjadin_representatif,
        standar_perjadin_transportasi,

        lampiran_honor,
        lampiran_perjadin,
        lampiran_perjadin_detail,
        lampiran_spk,

        permohonan_ganti_uang,
        permohonan_uang_persediaan,

        rekap_spj,
        rekap_honor,
        rekap_perjadin,
    },
    // strict: debug,
})

Vue.prototype.$store = store

export { store }