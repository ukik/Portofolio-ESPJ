const renderElement = require('../../scripts/declaratives/renderElement')

const {   
    Pengaturan,
    PengaturanHonor,
    PengaturanNomorSurat,
    PengaturanPajak,
    PengaturanSPPD,
    PengaturanUser, PengaturanUserCreate, PengaturanUserEdit,
    PengaturanTahun, PengaturanTahunCreate,
    PengaturanAliranKas, PengaturanAliranKasRincian, PengaturanAliranKasUpload,
    PengaturanBerkas, PengaturanBerkasCreate, PengaturanBerkasEdit,
} = require('../../modulars/pages/pengaturan/index')

const acl = [
  'Super Admin',
//   'Penghubung',
//   'Supervisor',
  // 'Verifikator',
]


// Super Admin: All Fitur (Full CRUD)
// Penghubung: Permohonan, Proses Lampiran, Perubahan Lampiran, SPJ
// Verifikasi: Verifikasi
// Supervisor: All Fitur (tidak ada POST/PUT/DELETE)

module.exports = [
    {
        path: '/pengaturan',
        component: renderElement('pengaturan', Pengaturan),
        name: 'pengaturan',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/honor',
        component: renderElement('pengaturan-honor', PengaturanHonor),
        name: 'pengaturan-honor',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/nomor-surat',
        component: renderElement('pengaturan-nomor-surat', PengaturanNomorSurat),
        name: 'pengaturan-nomor-surat',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/pajak',
        component: renderElement('pengaturan-pajak', PengaturanPajak),
        name: 'pengaturan-pajak',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/sppd',
        component: renderElement('pengaturan-sppd', PengaturanSPPD),
        name: 'pengaturan-sppd',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/user',
        component: renderElement('pengaturan-user', PengaturanUser),
        name: 'pengaturan-user',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/user/create',
        component: renderElement('pengaturan-user-create', PengaturanUserCreate),
        name: 'pengaturan-user-create',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/user/edit',
        component: renderElement('pengaturan-user-edit', PengaturanUserEdit),
        name: 'pengaturan-user-edit',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/tahun',
        component: renderElement('pengaturan-tahun', PengaturanTahun),
        name: 'pengaturan-tahun',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/tahun/create',
        component: renderElement('pengaturan-tahun-create', PengaturanTahunCreate),
        name: 'pengaturan-tahun-create',
        meta: { auth: true, acl }        
    },          
    {
        path: '/pengaturan/aliran-kas',
        component: renderElement('pengaturan-aliran-kas', PengaturanAliranKas),
        name: 'pengaturan-aliran-kas',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/aliran-kas/:id/rincian',
        component: renderElement('pengaturan-aliran-kas-rincian', PengaturanAliranKasRincian),
        name: 'pengaturan-aliran-kas-rincian',
        meta: { auth: true, acl: [
            'Super Admin',
            'Supervisor',
        ]}        
    },
    {
        path: '/pengaturan/aliran-kas/upload',
        component: renderElement('pengaturan-aliran-kas-upload', PengaturanAliranKasUpload),
        name: 'pengaturan-aliran-kas-upload',
        meta: { auth: true, acl }        
    },
    {
        path: '/pengaturan/berkas',
        component: renderElement('pengaturan-berkas', PengaturanBerkas),
        name: 'pengaturan-berkas',
        meta: { auth: true, acl }        
    },  
    {
        path: '/pengaturan/berkas/create',
        component: renderElement('pengaturan-berkas-create', PengaturanBerkasCreate),
        name: 'pengaturan-berkas-create',
        meta: { auth: true, acl }        
    },    
    {
        path: '/pengaturan/berkas/edit',
        component: renderElement('pengaturan-berkas-edit', PengaturanBerkasEdit),
        name: 'pengaturan-berkas-edit',
        meta: { auth: true, acl }        
    },        
]

