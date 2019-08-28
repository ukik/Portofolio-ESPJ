const renderElement = require('../../scripts/declaratives/renderElement')

const { 
    DataDasar, 
    DataDasarDPA, 
    DataDasarDPARincian,
    DataDasarDPAEdit,

    DataDasarBidang, 
    DataDasarBidangEdit,
    DataDasarBidangCreate,   

    DataDasarPemimpin, 
    DataDasarPemimpinCreate,
    DataDasarPemimpinEdit,    

    DataDasarPegawai, 
    DataDasarPegawaiCreate,
    DataDasarPegawaiEdit,

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
} = require('../../modulars/pages/data-dasar/index')

const acl = [
    'Super Admin',
    // 'Penghubung',
    'Supervisor',
    // 'Verifikator',
]

// Super Admin: All Fitur (Full CRUD)
// Penghubung: Permohonan, Proses Lampiran, Perubahan Lampiran, SPJ
// Verifikasi: Verifikasi
// Supervisor: All Fitur (tidak ada POST/PUT/DELETE)

module.exports = [
    {
        path: '/data-dasar',
        component: renderElement('data-dasar', DataDasar),
        name: 'data-dasar',
        meta: { auth: true, acl }
    },    
    {
        path: '/data-dasar/dpa',
        component: renderElement('data-dasar-dpa', DataDasarDPA),
        name: 'data-dasar-dpa',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/dpa/rincian',
        component: renderElement('data-dasar-dpa-rincian', DataDasarDPARincian),
        name: 'data-dasar-dpa-rincian',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/dpa/edit',
        component: renderElement('data-dasar-dpa-edit', DataDasarDPAEdit),
        name: 'data-dasar-dpa-edit',
        meta: { auth: true, acl }
    },
    
    
    {
        path: '/data-dasar/bidang',
        component: renderElement('data-dasar-bidang', DataDasarBidang),
        name: 'data-dasar-bidang',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/bidang/create',
        component: renderElement('data-dasar-bidang-create', DataDasarBidangCreate),
        name: 'data-dasar-bidang-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/bidang/edit',
        component: renderElement('data-dasar-bidang-edit', DataDasarBidangEdit),
        name: 'data-dasar-bidang-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/pegawai',
        component: renderElement('data-dasar-pegawai', DataDasarPegawai),
        name: 'data-dasar-pegawai',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/pegawai/create',
        component: renderElement('data-dasar-pegawai-create', DataDasarPegawaiCreate),
        name: 'data-dasar-pegawai-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/pegawai/edit',
        component: renderElement('data-dasar-pegawai-edit', DataDasarPegawaiEdit),
        name: 'data-dasar-pegawai-edit',
        meta: { auth: true, acl }
    },

    
    {
        path: '/data-dasar/pemimpin',
        component: renderElement('data-dasar-pemimpin', DataDasarPemimpin),
        name: 'data-dasar-pemimpin',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/pemimpin/create',
        component: renderElement('data-dasar-pemimpin-create', DataDasarPemimpinCreate),
        name: 'data-dasar-pemimpin-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/pemimpin/edit',
        component: renderElement('data-dasar-pemimpin-edit', DataDasarPemimpinEdit),
        name: 'data-dasar-pemimpin-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/kpa',
        component: renderElement('data-dasar-kpa', DataDasarKPA),
        name: 'data-dasar-kpa',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/kpa/create',
        component: renderElement('data-dasar-kpa-create', DataDasarKPACreate),
        name: 'data-dasar-kpa-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/kpa/edit',
        component: renderElement('data-dasar-kpa-edit', DataDasarKPAEdit),
        name: 'data-dasar-kpa-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/pptk',
        component: renderElement('data-dasar-pptk', DataDasarPPTK),
        name: 'data-dasar-pptk',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/pptk/create',
        component: renderElement('data-dasar-pptk-create', DataDasarPPTKCreate),
        name: 'data-dasar-pptk-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/pptk/edit',
        component: renderElement('data-dasar-pptk-edit', DataDasarPPTKEdit),
        name: 'data-dasar-pptk-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/ppk',
        component: renderElement('data-dasar-ppk', DataDasarPPK),
        name: 'data-dasar-ppk',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/ppk/create',
        component: renderElement('data-dasar-ppk-create', DataDasarPPKCreate),
        name: 'data-dasar-ppk-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/ppk/edit',
        component: renderElement('data-dasar-ppk-edit', DataDasarPPKEdit),
        name: 'data-dasar-ppk-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/bendahara',
        component: renderElement('data-dasar-bendahara', DataDasarBendahara),
        name: 'data-dasar-bendahara',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/bendahara/create',
        component: renderElement('data-dasar-bendahara-create', DataDasarBendaharaCreate),
        name: 'data-dasar-bendahara-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/bendahara/edit',
        component: renderElement('data-dasar-bendahara-edit', DataDasarBendaharaEdit),
        name: 'data-dasar-bendahara-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/penghubung',
        component: renderElement('data-dasar-penghubung', DataDasarPenghubung),
        name: 'data-dasar-penghubung',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/penghubung/create',
        component: renderElement('data-dasar-penghubung-create', DataDasarPenghubungCreate),
        name: 'data-dasar-penghubung-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/penghubung/edit',
        component: renderElement('data-dasar-penghubung-edit', DataDasarPenghubungEdit),
        name: 'data-dasar-penghubung-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/rekanan',
        component: renderElement('data-dasar-rekanan', DataDasarRekanan),
        name: 'data-dasar-rekanan',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/rekanan/create',
        component: renderElement('data-dasar-rekanan-create', DataDasarRekananCreate),
        name: 'data-dasar-rekanan-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/rekanan/edit',
        component: renderElement('data-dasar-rekanan-edit', DataDasarRekananEdit),
        name: 'data-dasar-rekanan-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/lokasi/dalam-negeri',
        component: renderElement('data-dasar-lokasi-dalam-negeri', DataDasarLokasiDalamNegeri),
        name: 'data-dasar-lokasi-dalam-negeri',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/lokasi/dalam-negeri/create',
        component: renderElement('data-dasar-lokasi-dalam-negeri-create', DataDasarLokasiDalamNegeriCreate),
        name: 'data-dasar-lokasi-dalam-negeri-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/lokasi/dalam-negeri/edit',
        component: renderElement('data-dasar-lokasi-dalam-negeri-edit', DataDasarLokasiDalamNegeriEdit),
        name: 'data-dasar-lokasi-dalam-negeri-edit',
        meta: { auth: true, acl }
    },


    {
        path: '/data-dasar/lokasi/luar-negeri',
        component: renderElement('data-dasar-lokasi-luar-negeri', DataDasarLokasiLuarNegeri),
        name: 'data-dasar-lokasi-luar-negeri',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/lokasi/luar-negeri/create',
        component: renderElement('data-dasar-lokasi-luar-negeri-create', DataDasarLokasiLuarNegeriCreate),
        name: 'data-dasar-lokasi-luar-negeri-create',
        meta: { auth: true, acl }
    },
    {
        path: '/data-dasar/lokasi/luar-negeri/edit',
        component: renderElement('data-dasar-lokasi-luar-negeri-edit', DataDasarLokasiLuarNegeriEdit),
        name: 'data-dasar-lokasi-luar-negeri-edit',
        meta: { auth: true, acl }
    },
]
