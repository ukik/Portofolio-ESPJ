const { DataDasarPenghubungCreate } = require('./create/index')
const { DataDasarPenghubungEdit } = require('./edit/index')

const DataDasarPenghubung = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/penghubung/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/penghubung/Index'))
    }, 'pages/data-dasar/penghubung'
  )
}

module.exports = {
  DataDasarPenghubung,
  DataDasarPenghubungCreate,
  DataDasarPenghubungEdit,
}
