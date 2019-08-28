const renderElement = require('../scripts/declaratives/renderElement')

const Verifikasi = require('./verifikasi/index')
const Pengaturan = require('./pengaturan/index')
const Lampiran = require('./lampiran/index')
const Spj = require('./spj/index')
const DataDasar = require('./data-dasar/index')
const Standar = require('./standar/index')
const Permohonan = require('./permohonan/index')
const Rekap = require('./rekap/index')

const { NotFound } = require('../modulars/pages/404/index')
const { Login, LoginUser } = require('../modulars/pages/login/index')
const { Welcome } = require('../modulars/pages/welcome/index')

const routes = [
    {
        path: '/404',
        component: renderElement('not-found', NotFound),
        name: '404',
        meta: { auth: true } 
    },
    {
        path: '/login',
        component: renderElement('login', Login),
        name: 'login',
        meta: { auth: false } 
    },
    {
        path: '/login/user',
        component: renderElement('login-user', LoginUser),
        name: 'login-user',
        meta: { 
            auth: true, 
            acl: [
                'Super Admin',
                'Penghubung',
                'Supervisor',
                'Verifikator',
            ] 
        } 
    },

    {
        path: '*',
        redirect: '/404',
        meta: { auth: false }
    },
    {
        path: '/',
        redirect: '/data-dasar',
        meta: { auth: false }        
    },    

    ...Permohonan,
    ...Standar,
    ...DataDasar,
    ...Spj,
    ...Lampiran,
    ...Verifikasi,
    ...Pengaturan,
    ...Rekap,
]

export { routes }