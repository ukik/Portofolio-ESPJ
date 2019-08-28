const renderElement = require('../../scripts/declaratives/renderElement')

const {   
    Verifikasi,
    VerifikasiGantiUang, VerifikasiGantiUangReview,
    VerifikasiHonor, VerifikasiHonorReview,
    VerifikasiPerjadin, VerifikasiPerjadinPerubahan, VerifikasiPerjadinReview,
    VerifikasiSPJ, VerifikasiSPJReview,
    VerifikasiSPK,
    VerifikasiSPKPerubahan, VerifikasiSPKReview 
} = require('../../modulars/pages/verifikasi/index')

const acl = [
    'Super Admin',
    // 'Penghubung',
    'Supervisor',
    'Verifikator',
]

// Super Admin: All Fitur (Full CRUD)
// Penghubung: Permohonan, Proses Lampiran, Perubahan Lampiran, SPJ
// Verifikasi: Verifikasi
// Supervisor: All Fitur (tidak ada POST/PUT/DELETE)

module.exports = [
    {
        path: '/verifikasi',
        component: renderElement('verifikasi', Verifikasi),
        name: 'verifikasi',
        meta: { auth: true, acl } 
    },    
    {
        path: '/verifikasi/ganti-uang',
        component: renderElement('verifikasi-ganti-uang', VerifikasiGantiUang),
        name: 'verifikasi-ganti-uang',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/ganti-uang/review',
        component: renderElement('verifikasi-ganti-uang-review', VerifikasiGantiUangReview),
        name: 'verifikasi-ganti-uang-review',
        meta: { auth: true, acl } 
    },

    {
        path: '/verifikasi/honor',
        component: renderElement('verifikasi-honor', VerifikasiHonor),
        name: 'verifikasi-honor',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/honor/review',
        component: renderElement('verifikasi-honor-review', VerifikasiHonorReview),
        name: 'verifikasi-honor-review',
        meta: { auth: true, acl } 
    },    
    {
        path: '/verifikasi/perjadin',
        component: renderElement('verifikasi-perjadin', VerifikasiPerjadin),
        name: 'verifikasi-perjadin',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/perjadin/perubahan',
        component: renderElement('verifikasi-perjadin-perubahan', VerifikasiPerjadinPerubahan),
        name: 'verifikasi-perjadin-perubahan',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/perjadin/review',
        component: renderElement('verifikasi-perjadin-review', VerifikasiPerjadinReview),
        name: 'verifikasi-perjadin-review',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/spj',
        component: renderElement('verifikasi-spj', VerifikasiSPJ),
        name: 'verifikasi-spj',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/spj/review',
        component: renderElement('verifikasi-spj-review', VerifikasiSPJReview),
        name: 'verifikasi-spj-review',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/spk',
        component: renderElement('verifikasi-spk', VerifikasiSPK),
        name: 'verifikasi-spk',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/spk/perubahan',
        component: renderElement('verifikasi-spk-perubahan', VerifikasiSPKPerubahan),
        name: 'verifikasi-spk-perubahan',
        meta: { auth: true, acl } 
    },
    {
        path: '/verifikasi/spk/review',
        component: renderElement('verifikasi-spk-review', VerifikasiSPKReview),
        name: 'verifikasi-spk-review',
        meta: { auth: true, acl } 
    },

        
]