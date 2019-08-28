const StandarPerjadinHotelDalamWilayahEdit = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/standar/perjadin/hotel/dalam-wilayah/edit/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/standar/perjadin/hotel/dalam-wilayah/edit/Index'))
    }, 'pages/standar/perjadin/hotel/dalam-wilayah/edit'
  )
}

module.exports = {
  StandarPerjadinHotelDalamWilayahEdit,
}
