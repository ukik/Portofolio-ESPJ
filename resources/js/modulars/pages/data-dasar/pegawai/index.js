const { DataDasarPegawaiCreate } = require('./create/index')
const { DataDasarPegawaiEdit } = require('./edit/index')

const DataDasarPegawai = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/pegawai/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/pegawai/Index'))
    }, 'pages/data-dasar/pegawai'
  )
}

module.exports = {
  DataDasarPegawai,
  DataDasarPegawaiCreate,
  DataDasarPegawaiEdit,
}
