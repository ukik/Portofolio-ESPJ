
const { StandarPerjadinHotelLuarWilayahCreate } = require('./create/index')
const { StandarPerjadinHotelLuarWilayahEdit } = require('./edit/index')

const StandarPerjadinHotelLuarWilayah = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/hotel/luar-wilayah/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/hotel/luar-wilayah/Index'))
    }, 'pages/standar/perjadin/hotel/luar-wilayah'
  )
}

module.exports = {
  StandarPerjadinHotelLuarWilayah,
  StandarPerjadinHotelLuarWilayahCreate,
  StandarPerjadinHotelLuarWilayahEdit,
}
