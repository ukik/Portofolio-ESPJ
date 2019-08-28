const AlertError = resolve => {
  require.ensure(
    ['../../../widgets/alerts/error/Index.vue'],
    () => {
      resolve(require('../../../widgets/alerts/error/Index.vue'))
    }, 'widgets/alerts/error'
  )
}

module.exports = {
  components: {
    AlertError,
  }
}
