
const { StandarPerjadinHotelDalamWilayahCreate } = require('./create/index')
const { StandarPerjadinHotelDalamWilayahEdit } = require('./edit/index')

const StandarPerjadinHotelDalamWilayah = resolve => {
  require.ensure(
    ['../../../../../../components/pages/standar/perjadin/hotel/dalam-wilayah/Index'],
    () => {
      resolve(require('../../../../../../components/pages/standar/perjadin/hotel/dalam-wilayah/Index'))
    }, 'pages/standar/perjadin/hotel/dalam-wilayah'
  )
}

module.exports = {
  StandarPerjadinHotelDalamWilayah,
  StandarPerjadinHotelDalamWilayahEdit,
  StandarPerjadinHotelDalamWilayahCreate,
}
