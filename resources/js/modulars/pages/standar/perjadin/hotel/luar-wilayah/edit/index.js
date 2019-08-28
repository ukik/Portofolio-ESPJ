const StandarPerjadinHotelLuarWilayahEdit = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/hotel/luar-wilayah/edit/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/hotel/luar-wilayah/edit/Index'))
    }, 'pages/standar/perjadin/hotel/luar-wilayah/edit'
  )
}

module.exports = {
  StandarPerjadinHotelLuarWilayahEdit,
}
