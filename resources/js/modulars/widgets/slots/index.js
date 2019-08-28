// slots
const Toolbar = resolve => {
  require.ensure(
    ['../../../widgets/slots/Toolbar'],
    () => {
      resolve(require('../../../widgets/slots/Toolbar'))
    }, 'widgets/slots/toolbar'
  )
}

const NavItem = resolve => {
  require.ensure(
    ['../../../widgets/slots/NavItem'],
    () => {
      resolve(require('../../../widgets/slots/NavItem'))
    }, 'widgets/slots/navitem'
  )
}

const NavItemRight = resolve => {
  require.ensure(
    ['../../../widgets/slots/NavItemRight'],
    () => {
      resolve(require('../../../widgets/slots/NavItemRight'))
    }, 'widgets/slots/navitem-right'
  )
}

const DropdownButton = resolve => {
  require.ensure(
    ['../../../widgets/slots/DropdownButton'],
    () => {
      resolve(require('../../../widgets/slots/DropdownButton'))
    }, 'widgets/slots/dropdown-button'
  )
}

const Formulir = resolve => {
  require.ensure(
    ['../../../widgets/slots/Formulir'],
    () => {
      resolve(require('../../../widgets/slots/Formulir'))
    }, 'widgets/slots/formulir'
  )
}

const FormulirButton = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirButton'],
    () => {
      resolve(require('../../../widgets/slots/FormulirButton'))
    }, 'widgets/slots/formulir-button'
  )
}

const FormulirInput = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirInput'],
    () => {
      resolve(require('../../../widgets/slots/FormulirInput'))
    }, 'widgets/slots/formulir-input'
  )
}

const FormulirInputHonor = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirInputHonor'],
    () => {
      resolve(require('../../../widgets/slots/FormulirInputHonor'))
    }, 'widgets/slots/formulir-input-honor'
  )
}

const FormulirInputPajak = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirInputPajak'],
    () => {
      resolve(require('../../../widgets/slots/FormulirInputPajak'))
    }, 'widgets/slots/formulir-input-pajak'
  )
}


const FormulirDropdown = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirDropdown'],
    () => {
      resolve(require('../../../widgets/slots/FormulirDropdown'))
    }, 'widgets/slots/formulir-dropdown'
  )
}

const FormulirFile = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirFile'],
    () => {
      resolve(require('../../../widgets/slots/FormulirFile'))
    }, 'widgets/slots/formulir-file'
  )
}

const FormulirTextarea = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirTextarea'],
    () => {
      resolve(require('../../../widgets/slots/FormulirTextarea'))
    }, 'widgets/slots/formulir-textarea'
  )
}

const FormulirSwitch = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirSwitch'],
    () => {
      resolve(require('../../../widgets/slots/FormulirSwitch'))
    }, 'widgets/slots/formulir-switch'
  )
}

const FormulirPicker = resolve => {
  require.ensure(
    ['../../../widgets/slots/FormulirPicker'],
    () => {
      resolve(require('../../../widgets/slots/FormulirPicker'))
    }, 'widgets/slots/formulir-picker'
  )
}

module.exports = {
  components: {
    Toolbar,
    NavItem,
    NavItemRight,
    DropdownButton,
    Formulir,
    FormulirButton,
    FormulirInput,
    FormulirInputHonor,
    FormulirInputPajak,
    FormulirDropdown,
    FormulirFile,
    FormulirTextarea,
    FormulirSwitch,
    FormulirPicker,
  }
}
