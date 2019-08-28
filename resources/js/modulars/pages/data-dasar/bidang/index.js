const { DataDasarBidangEdit } = require('./edit/index')
const { DataDasarBidangCreate } = require('./create/index')

const DataDasarBidang = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/bidang/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/bidang/Index'))
    }, 'pages/data-dasar/bidang'
  )
}

module.exports = {
  DataDasarBidang,
  DataDasarBidangEdit,
  DataDasarBidangCreate,
}
