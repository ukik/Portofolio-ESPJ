const { DataDasarPPTKCreate } = require('./create/index')
const { DataDasarPPTKEdit } = require('./edit/index')

const DataDasarPPTK = resolve => {
  require.ensure(
    ['../../../../components/pages/data-dasar/pptk/Index'],
    () => {
      resolve(require('../../../../components/pages/data-dasar/pptk/Index'))
    }, 'pages/data-dasar/pptk'
  )
}

module.exports = {
  DataDasarPPTK,
  DataDasarPPTKCreate,
  DataDasarPPTKEdit,
}
