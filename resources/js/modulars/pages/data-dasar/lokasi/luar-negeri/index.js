const { DataDasarLokasiLuarNegeriCreate } = require('./create/index')
const { DataDasarLokasiLuarNegeriEdit } = require('./edit/index')

const DataDasarLokasiLuarNegeri = resolve => {
  require.ensure(
    ['../../../../../components/pages/data-dasar/lokasi/luar-negeri/Index'],
    () => {
      resolve(require('../../../../../components/pages/data-dasar/lokasi/luar-negeri/Index'))
    }, 'pages/data-dasar/lokasi/luar-negeri'
  )
}

module.exports = {
  DataDasarLokasiLuarNegeri,
  DataDasarLokasiLuarNegeriCreate,
  DataDasarLokasiLuarNegeriEdit,
}
