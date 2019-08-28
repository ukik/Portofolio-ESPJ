// commons
const Thumbnails = resolve => {
  require.ensure(
    ['../../../widgets/commons/Thumbnails'],
    () => {
      resolve(require('../../../widgets/commons/Thumbnails'))
    }, 'widgets/commons/thumbnails'
  )
}

const BackButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/BackButton'],
    () => {
      resolve(require('../../../widgets/commons/BackButton'))
    }, 'widgets/commons/back-button'
  )
}

const AddButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/AddButton'],
    () => {
      resolve(require('../../../widgets/commons/AddButton'))
    }, 'widgets/commons/add-button'
  )
}

const ConfirmButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/ConfirmButton'],
    () => {
      resolve(require('../../../widgets/commons/ConfirmButton'))
    }, 'widgets/commons/confirm-button'
  )
}

const CancelButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/CancelButton'],
    () => {
      resolve(require('../../../widgets/commons/CancelButton'))
    }, 'widgets/commons/cancel-button'
  )
}

const UploadButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/UploadButton'],
    () => {
      resolve(require('../../../widgets/commons/UploadButton'))
    }, 'widgets/commons/upload-button'
  )
}

const FormulirLegend = resolve => {
  require.ensure(
    ['../../../widgets/commons/FormulirLegend'],
    () => {
      resolve(require('../../../widgets/commons/FormulirLegend'))
    }, 'widgets/commons/formulir-title'
  )
}

const RefreshButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/RefreshButton'],
    () => {
      resolve(require('../../../widgets/commons/RefreshButton'))
    }, 'widgets/commons/refresh-button'
  )
}

const ResetButton = resolve => {
  require.ensure(
    ['../../../widgets/commons/ResetButton'],
    () => {
      resolve(require('../../../widgets/commons/ResetButton'))
    }, 'widgets/commons/reset-button'
  )
}


module.exports = {
  components: {
    Thumbnails,
    BackButton,
    AddButton,
    ConfirmButton,
    CancelButton,
    UploadButton,
    RefreshButton,
    ResetButton,
    FormulirLegend,
  }
}
