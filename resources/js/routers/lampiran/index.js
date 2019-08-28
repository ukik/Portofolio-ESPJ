const renderElement = require('../../scripts/declaratives/renderElement')

const {
  LampiranPerjadin,
  LampiranPerjadinPerubahan,
  LampiranPerjadinPerubahanCreate,
  LampiranPerjadinPerubahanEdit,
  LampiranPerjadinPerubahanDetail,
  LampiranPerjadinPerubahanDetailBiaya,
  LampiranPerjadinPerubahanDetailEdit,
  LampiranPerjadinPerubahanDetailCreate,
  LampiranHonor,
  LampiranHonorCreate,
  LampiranHonorEdit,
  LampiranHonorDetail,
  LampiranHonorDetailCreate,
  LampiranHonorDetailEdit,
  LampiranSPK,
  LampiranSPKCreate,
  LampiranSPKEdit,
  LampiranSPKRAB,
} = require('../../modulars/pages/lampiran/index')

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
    path: '/lampiran/honor',
    component: renderElement('lampiran-honor', LampiranHonor),
    name: 'lampiran-honor',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/honor/create',
    component: renderElement('lampiran-honor-create', LampiranHonorCreate),
    name: 'lampiran-honor-create',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/honor/edit',
    component: renderElement('lampiran-honor-edit', LampiranHonorEdit),
    name: 'lampiran-honor-edit',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/honor/detail',
    component: renderElement('lampiran-honor-detail', LampiranHonorDetail),
    name: 'lampiran-honor-detail',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/honor/detail/create',
    component: renderElement('lampiran-honor-detail-create', LampiranHonorDetailCreate),
    name: 'lampiran-honor-detail-create',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/honor/detail/edit',
    component: renderElement('lampiran-honor-detail-edit', LampiranHonorDetailEdit),
    name: 'lampiran-honor-detail-edit',
    meta: { auth: true, acl }
  },
  

  {
    path: '/lampiran/spk',
    component: renderElement('lampiran-spk', LampiranSPK),
    name: 'lampiran-spk',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/spk/create',
    component: renderElement('lampiran-spk-create', LampiranSPKCreate),
    name: 'lampiran-spk-create',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/spk/edit',
    component: renderElement('lampiran-spk-edit', LampiranSPKEdit),
    name: 'lampiran-spk-edit',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/spk/rab',
    component: renderElement('lampiran-spk-rab', LampiranSPKRAB),
    name: 'lampiran-spk-rab',
    meta: { auth: true, acl }
  },
  
  
  {
    path: '/lampiran/perjadin/perubahan',
    component: renderElement('lampiran-perjadin-perubahan', LampiranPerjadinPerubahan),
    name: 'lampiran-perjadin-perubahan',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/perjadin/perubahan/create',
    component: renderElement('lampiran-perjadin-perubahan-create', LampiranPerjadinPerubahanCreate),
    name: 'lampiran-perjadin-perubahan-create',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/perjadin/perubahan/edit',
    component: renderElement('lampiran-perjadin-perubahan-edit', LampiranPerjadinPerubahanEdit),
    name: 'lampiran-perjadin-perubahan-edit',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/perjadin/perubahan/detail',
    component: renderElement('lampiran-perjadin-perubahan-detail', LampiranPerjadinPerubahanDetail),
    name: 'lampiran-perjadin-perubahan-detail',
    meta: { auth: true, acl }
  },

  {
    path: '/lampiran/perjadin/perubahan/detail/biaya',
    component: renderElement('lampiran-perjadin-perubahan-detail-biaya', LampiranPerjadinPerubahanDetailBiaya),
    name: 'lampiran-perjadin-perubahan-detail-biaya',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/perjadin/perubahan/detail/edit',
    component: renderElement('lampiran-perjadin-perubahan-detail-edit', LampiranPerjadinPerubahanDetailEdit),
    name: 'lampiran-perjadin-perubahan-detail-edit',
    meta: { auth: true, acl }
  },
  {
    path: '/lampiran/perjadin/perubahan/detail/create',
    component: renderElement('lampiran-perjadin-perubahan-detail-create', LampiranPerjadinPerubahanDetailCreate),
    name: 'lampiran-perjadin-perubahan-detail-create',
    meta: { auth: true, acl }
  },
]
