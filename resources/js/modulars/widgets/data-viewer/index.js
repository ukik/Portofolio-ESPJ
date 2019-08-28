const DataViewer = resolve => {
  require.ensure(
    ['../../../widgets/data-viewer/Index.vue'],
    () => {
      resolve(require('../../../widgets/data-viewer/Index.vue'))
    }, 'widgets/data-viewer'
  )
}

module.exports = {
  components: {
    DataViewer
  }
}
