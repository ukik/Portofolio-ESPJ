

const Autocomplete = resolve => {
    require.ensure(
      ['../../../widgets/autocomplete/Index'],
      () => {
        resolve(require('../../../widgets/autocomplete/Index'))
      }, 'widgets/autocomplete'
    )
  }

module.exports = {
  components: {
    Autocomplete,
  }
}