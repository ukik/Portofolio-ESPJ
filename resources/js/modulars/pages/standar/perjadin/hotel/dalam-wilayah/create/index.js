const StandarPerjadinHotelDalamWilayahCreate = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/hotel/dalam-wilayah/create/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/hotel/dalam-wilayah/create/Index'))
    }, 'pages/standar/perjadin/hotel/dalam-wilayah/create'
  )
}

module.exports = {
  StandarPerjadinHotelDalamWilayahCreate,
}
