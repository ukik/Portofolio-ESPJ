const renderElement = require('../../scripts/declaratives/renderElement')

const {   
    Spj,
    SpjRekap, SpjRekapEdit,  SpjRekapCreate,
    SpjBerkas, SpjBerkasCreate,
    SpjRead,
} = require('../../modulars/pages/spj/index')

const acl = [
    'Super Admin',
    'Penghubung',
    'Supervisor',
    // 'Verifikator',
]

// Super Admin: All Fitur (Full CRUD)
// Penghubung: Permohonan, Proses Lampiran, Perubahan Lampiran, SPJ
// Verifikasi: Verifikasi
// Supervisor: All Fitur (tidak ada POST/PUT/DELETE)

module.exports = [
    {
        path: '/spj',
        component: renderElement('spj', Spj),
        name: 'spj',
        meta: { auth: true, acl }        
    },    
    {
        path: '/spj/rekap',
        component: renderElement('spj-rekap', SpjRekap),
        name: 'spj-rekap',
        meta: { auth: true, acl }        
    },      
    {
        path: '/spj/read',
        component: renderElement('spj-read', SpjRead),
        name: 'spj-read',
        meta: { auth: true, acl }        
    },        
    {
        path: '/spj/rekap/edit',
        component: renderElement('spj-rekap-edit', SpjRekapEdit),
        name: 'spj-rekap-edit',
        meta: { auth: true, acl }        
    },      
    {
        path: '/spj/rekap/create',
        component: renderElement('spj-rekap-create', SpjRekapCreate),
        name: 'spj-rekap-create',
        meta: { auth: true, acl }        
    },      
    {
        path: '/spj/berkas',
        component: renderElement('spj-berkas', SpjBerkas),
        name: 'spj-berkas',
        meta: { auth: true, acl }        
    },   
    {
        path: '/spj/berkas/create',
        component: renderElement('spj-berkas-create', SpjBerkasCreate),
        name: 'spj-berkas-create',
        meta: { auth: true, acl }        
    },   

    
]