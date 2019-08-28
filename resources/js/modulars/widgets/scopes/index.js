// scopes
const TableView = resolve => {
  require.ensure(
    ['../../../widgets/scopes/tableview/Index'],
    () => {
      resolve(require('../../../widgets/scopes/tableview/Index'))
    }, 'widgets/scopes/table-data-view'
  )
}

const Dropdown = resolve => {
  require.ensure(
    ['../../../widgets/scopes/dropdown/Index'],
    () => {
      resolve(require('../../../widgets/scopes/dropdown/Index'))
    }, 'widgets/scopes/table-data-dropdown'
  )
}

const Keyword = resolve => {
  require.ensure(
    ['../../../widgets/scopes/keyword/Index'],
    () => {
      resolve(require('../../../widgets/scopes/keyword/Index'))
    }, 'widgets/scopes/table-data-keyword'
  )
}


module.exports = {
  components: {
    TableView,
    Dropdown,
    Keyword,
  }
}
