import Vue from 'vue'

// scripts
const _shortcutRouter = require('../scripts/mixins/shortcutRouter')
const _mainPageNotFound = require('../scripts/mixins/mainPageNotFound')
const _todayDate = require('../scripts/mixins/todayDate')
const _filterNumberAndDecimal = require('../scripts/mixins/filterNumberAndDecimal')
const _tableViewRowsLength = require('../scripts/mixins/tableViewRowsLength')
const _transitionEffect = require('../scripts/mixins/transitionEffect')
const _notificationSnotify = require('../scripts/mixins/notificationSnotify')
const _notificationNotify = require('../scripts/mixins/notificationNotify')
const _vuexCallbackMessage = require('../scripts/mixins/vuexCallbackMessage')
const _indexedDB = require('../scripts/mixins/indexedDB')
const _onPaginator = require('../scripts/mixins/onPaginator')
const _onDeleteSweetAlert = require('../scripts/mixins/onDeleteSweetAlert')
const _onCancelSweetAlert = require('../scripts/mixins/onCancelSweetAlert')
const _onOpenDocument = require('../scripts/mixins/onOpenDocument')
const _onAjukanSweetAlert = require('../scripts/mixins/onAjukanSweetAlert')
const _axiosHeaders = require('../scripts/mixins/axiosHeaders')
const _routerACL =  require('../scripts/mixins/routerACL')
const _onLogout =  require('../scripts/mixins/onLogout')


// modular
const _modular = require('../modulars/index')

const global = {
    mixins: [
        _shortcutRouter,
        _mainPageNotFound,
        _modular,
        _todayDate,
        _filterNumberAndDecimal,
        _tableViewRowsLength,
        _transitionEffect,
        _notificationSnotify,
        _notificationNotify,
        _vuexCallbackMessage,
        // _indexedDB,
        _onPaginator,
        _onDeleteSweetAlert,
        _onCancelSweetAlert,
        _onOpenDocument,
        _onAjukanSweetAlert,
        _axiosHeaders,
        _routerACL,
        _onLogout,
    ],
    components: {
        'Cache': () => Vue.component('Cache', {
            template:  `
                <KeepAlive>
                    <slot />
                </KeepAlive>
            `
        })
    },
}

Vue.mixin(global)