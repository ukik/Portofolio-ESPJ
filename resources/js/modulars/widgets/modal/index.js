const Modal = resolve => {
  require.ensure(
    ['../../../widgets/modal/Index.vue'],
    () => {
      resolve(require('../../../widgets/modal/Index.vue'))
    }, 'widgets/modal'
  )
}

module.exports = {
  components: {
    Modal,
  }
}
