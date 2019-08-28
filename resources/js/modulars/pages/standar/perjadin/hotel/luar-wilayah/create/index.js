const StandarPerjadinHotelLuarWilayahCreate = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/hotel/luar-wilayah/create/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/hotel/luar-wilayah/create/Index'))
    }, 'pages/standar/perjadin/hotel/luar-wilayah/create'
  )
}

module.exports = {
  StandarPerjadinHotelLuarWilayahCreate,
}
