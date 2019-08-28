const { DataDasarLokasiDalamNegeriCreate } = require('./create/index')
const { DataDasarLokasiDalamNegeriEdit } = require('./edit/index')

const DataDasarLokasiDalamNegeri = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/lokasi/dalam-negeri/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/lokasi/dalam-negeri/Index'))
    }, 'pages/data-dasar/lokasi/dalam-negeri'
  )
}

module.exports = {
  DataDasarLokasiDalamNegeri,
  DataDasarLokasiDalamNegeriCreate,
  DataDasarLokasiDalamNegeriEdit,
}
