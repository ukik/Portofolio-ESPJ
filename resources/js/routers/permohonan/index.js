const renderElement = require('../../scripts/declaratives/renderElement')

const {   
    PermohonanGantiUang,
    PermohonanGantiUangCreate,
    PermohonanGantiUangEdit,
    PermohonanGantiUangAliranKas,

    PermohonanUangPersediaan,
    PermohonanUangPersediaanCreate,
    PermohonanUangPersediaanEdit,    
} = require('../../modulars/pages/permohonan/index')

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
        path: '/permohonan/ganti-uang',
        component: renderElement('permohonan-ganti-uang', PermohonanGantiUang),
        name: 'permohonan-ganti-uang',
        meta: { auth: true, acl }        
    },  
    {
        path: '/permohonan/ganti-uang/create',
        component: renderElement('permohonan-ganti-uang-create', PermohonanGantiUangCreate),
        name: 'permohonan-ganti-uang-create',
        meta: { auth: true, acl }        
    },  
    {
        path: '/permohonan/ganti-uang/edit',
        component: renderElement('permohonan-ganti-uang-edit', PermohonanGantiUangEdit),
        name: 'permohonan-ganti-uang-edit',
        meta: { auth: true, acl }        
    },  
    {
        path: '/permohonan/ganti-uang/aliran-kas',
        component: renderElement('permohonan-ganti-uang-aliran-kas', PermohonanGantiUangAliranKas),
        name: 'permohonan-ganti-uang-aliran-kas',
        meta: { auth: true, acl }        
    },  

    {
        path: '/permohonan/uang-persediaan',
        component: renderElement('permohonan-uang-persediaan', PermohonanUangPersediaan),
        name: 'permohonan-uang-persediaan',
        meta: { auth: true, acl }        
    },      
    {
        path: '/permohonan/uang-persediaan/create',
        component: renderElement('permohonan-uang-persediaan-create', PermohonanUangPersediaanCreate),
        name: 'permohonan-uang-persediaan-create',
        meta: { auth: true, acl }        
    },      
    {
        path: '/permohonan/uang-persediaan/edit',
        component: renderElement('permohonan-uang-persediaan-edit', PermohonanUangPersediaanEdit),
        name: 'permohonan-uang-persediaan-edit',
        meta: { auth: true, acl }        
    },      

]

