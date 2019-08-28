const renderElement = require('../../scripts/declaratives/renderElement')

const {   
    Rekap,
    RekapPerjadin,
    RekapSpj,
    RekapHonor,
} = require('../../modulars/pages/rekap')

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
        path: '/rekap',
        component: renderElement('rekap', Rekap),
        name: 'rekap',
        meta: { auth: true, acl }        
    },    
    {
        path: '/rekap/perjadin',
        component: renderElement('rekap-perjadin', RekapPerjadin),
        name: 'rekap-perjadin',
        meta: { auth: true, acl }        
    },    
    {
        path: '/rekap/spj',
        component: renderElement('rekap-spj', RekapSpj),
        name: 'rekap-spj',
        meta: { auth: true, acl }        
    },    
    {
        path: '/rekap/honor',
        component: renderElement('rekap-honor', RekapHonor),
        name: 'rekap-honor',
        meta: { auth: true, acl }        
    },    
]
