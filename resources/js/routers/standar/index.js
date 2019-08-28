const renderElement = require('../../scripts/declaratives/renderElement')

const {
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
} = require('../../modulars/pages/standar/index')

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
        path: '/standar/perjadin/harian/dalam-negeri',
        component: renderElement('standar-perjadin-harian-dalam-negeri', StandarPerjadinHarianDalamNegeri),
        name: 'standar-perjadin-harian-dalam-negeri',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/harian/dalam-negeri/create',
        component: renderElement('standar-perjadin-harian-dalam-negeri-create', StandarPerjadinHarianDalamNegeriCreate),
        name: 'standar-perjadin-harian-dalam-negeri-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/harian/dalam-negeri/edit',
        component: renderElement('standar-perjadin-harian-dalam-negeri-edit', StandarPerjadinHarianDalamNegeriEdit),
        name: 'standar-perjadin-harian-dalam-negeri-edit',
        meta: { auth: true, acl }              
    },


    {
        path: '/standar/perjadin/harian/luar-negeri',
        component: renderElement('standar-perjadin-harian-luar-negeri', StandarPerjadinHarianLuarNegeri),
        name: 'standar-perjadin-harian-luar-negeri',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/harian/luar-negeri/create',
        component: renderElement('standar-perjadin-harian-luar-negeri-create', StandarPerjadinHarianLuarNegeriCreate),
        name: 'standar-perjadin-harian-luar-negeri-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/harian/luar-negeri/edit',
        component: renderElement('standar-perjadin-harian-luar-negeri-edit', StandarPerjadinHarianLuarNegeriEdit),
        name: 'standar-perjadin-harian-luar-negeri-edit',
        meta: { auth: true, acl }              
    },


    {
        path: '/standar/perjadin/hotel/dalam-wilayah',
        component: renderElement('standar-perjadin-hotel-dalam-wilayah', StandarPerjadinHotelDalamWilayah),
        name: 'standar-perjadin-hotel-dalam-wilayah',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/hotel/dalam-wilayah/create',
        component: renderElement('standar-perjadin-hotel-dalam-wilayah-create', StandarPerjadinHotelDalamWilayahCreate),
        name: 'standar-perjadin-hotel-dalam-wilayah-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/hotel/dalam-wilayah/edit',
        component: renderElement('standar-perjadin-hotel-dalam-wilayah-edit', StandarPerjadinHotelDalamWilayahEdit),
        name: 'standar-perjadin-hotel-dalam-wilayah-edit',
        meta: { auth: true, acl }              
    },

    {
        path: '/standar/perjadin/hotel/luar-wilayah',
        component: renderElement('standar-perjadin-hotel-luar-wilayah', StandarPerjadinHotelLuarWilayah),
        name: 'standar-perjadin-hotel-luar-wilayah',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/hotel/luar-wilayah/create',
        component: renderElement('standar-perjadin-hotel-luar-wilayah-create', StandarPerjadinHotelLuarWilayahCreate),
        name: 'standar-perjadin-hotel-luar-wilayah-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/hotel/luar-wilayah/edit',
        component: renderElement('standar-perjadin-hotel-luar-wilayah-edit', StandarPerjadinHotelLuarWilayahEdit),
        name: 'standar-perjadin-hotel-luar-wilayah-edit',
        meta: { auth: true, acl }              
    },

    {
        path: '/standar/perjadin/representatif',
        component: renderElement('standar-perjadin-representatif', StandarPerjadinRepresentatif),
        name: 'standar-perjadin-representatif',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/representatif/create',
        component: renderElement('standar-perjadin-representatif-create', StandarPerjadinRepresentatifCreate),
        name: 'standar-perjadin-representatif-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/representatif/edit',
        component: renderElement('standar-perjadin-representatif-edit', StandarPerjadinRepresentatifEdit),
        name: 'standar-perjadin-representatif-edit',
        meta: { auth: true, acl }              
    },

    {
        path: '/standar/perjadin/transportasi',
        component: renderElement('standar-perjadin-transportasi', StandarPerjadinTransportasi),
        name: 'standar-perjadin-transportasi',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/transportasi/create',
        component: renderElement('standar-perjadin-transportasi-create', StandarPerjadinTransportasiCreate),
        name: 'standar-perjadin-transportasi-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/transportasi/edit',
        component: renderElement('standar-perjadin-transportasi-edit', StandarPerjadinTransportasiEdit),
        name: 'standar-perjadin-transportasi-edit',
        meta: { auth: true, acl }              
    },

    {
        path: '/standar/perjadin/honor',
        component: renderElement('standar-perjadin-honor', StandarPerjadinHonor),
        name: 'standar-perjadin-honor',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/honor/create',
        component: renderElement('standar-perjadin-honor-create', StandarPerjadinHonorCreate),
        name: 'standar-perjadin-honor-create',
        meta: { auth: true, acl }              
    },
    {
        path: '/standar/perjadin/honor/edit',
        component: renderElement('standar-perjadin-honor-edit', StandarPerjadinHonorEdit),
        name: 'standar-perjadin-honor-edit',
        meta: { auth: true, acl }              
    },
        
]