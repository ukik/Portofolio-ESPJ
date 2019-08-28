const _Commons = require('./commons/index')
const _Scopes = require('./scopes/index')
const _Slots = require('./slots/index')
const _Spinners = require('./spinners/index')

const _Alerts = require('./alerts/index')
const _Modal = require('./modal/index')
const _DataViewer = require('./data-viewer/index')

const _FullPageLoading = require('./fullpage-loading/index')
const _Autocomplete = require('./autocomplete/index')

module.exports = {
  mixins: [
    _Commons,
    _Scopes,
    _Slots,
    _Spinners,
    _Alerts,
    _Modal,
    _DataViewer,
    _FullPageLoading,
    _Autocomplete,
  ]
}
