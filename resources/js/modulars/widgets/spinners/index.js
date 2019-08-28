const LoaderCircle = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-circle/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-circle/Index'))
    }, 'widgets/spinners/lds-circle'
  )
}

const LoaderDefault = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-default/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-default/Index'))
    }, 'widgets/spinners/lds-default'
  )
}

const LoaderDualRing = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-dual-ring/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-dual-ring/Index'))
    }, 'widgets/spinners/lds-dual-ring'
  )
}

const LoaderEllipsis = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-ellipsis/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-ellipsis/Index'))
    }, 'widgets/spinners/lds-ellipsis'
  )
}

const LoaderFacebook = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-facebook/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-facebook/Index'))
    }, 'widgets/spinners/lds-facebook'
  )
}

const LoaderGrid = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-grid/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-grid/Index'))
    }, 'widgets/spinners/lds-grid'
  )
}

const LoaderHeart = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-heart/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-heart/Index'))
    }, 'widgets/spinners/lds-heart'
  )
}

const LoaderHourglass = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-hourglass/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-hourglass/Index'))
    }, 'widgets/spinners/lds-hourglass'
  )
}

const LoaderRing = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-ring/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-ring/Index'))
    }, 'widgets/spinners/lds-ring'
  )
}

const LoaderRipple = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-ripple/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-ripple/Index'))
    }, 'widgets/spinners/lds-ripple'
  )
}

const LoaderRoller = resolve => {
  require.ensure(
    ['../../../widgets/spinners/lds-roller/Index'],
    () => {
      resolve(require('../../../widgets/spinners/lds-roller/Index'))
    }, 'widgets/spinners/lds-roller'
  )
}

const LoaderSpinner = require('../../../widgets/spinners/lds-spinner/Index')

module.exports = {
  components: {
    LoaderDefault,
    LoaderDualRing,
    LoaderEllipsis,
    LoaderFacebook,
    LoaderGrid,
    LoaderHourglass,
    LoaderHeart,
    LoaderRing,
    LoaderRipple,
    LoaderRoller,
    LoaderCircle,
    LoaderSpinner,
  }
}
