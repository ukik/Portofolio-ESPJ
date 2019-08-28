const _Layouts = require('./layouts/index')
const _Widgets = require('./widgets/index')
const _Pages = require('./pages/index')

module.exports = {
  mixins: [
    _Pages,
    _Layouts,
    _Widgets,
  ]
}
