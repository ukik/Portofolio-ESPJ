const Header = resolve => {
  require.ensure(
    ['../../layouts/header/Index'],
    () => {
      resolve(require('../../layouts/header/Index'))
    }, 'layouts/layouts-header'
  )
}

const Navigation = resolve => {
  require.ensure(
    ['../../layouts/navigation/Index'],
    () => {
      resolve(require('../../layouts/navigation/Index'))
    }, 'layouts/layouts-navigation'
  )
}

const Content = resolve => {
  require.ensure(
    ['../../layouts/content/Index'],
    () => {
      resolve(require('../../layouts/content/Index'))
    }, 'layouts/layouts-content'
  )
}

const Footer = resolve => {
  require.ensure(
    ['../../layouts/footer/Index'],
    () => {
      resolve(require('../../layouts/footer/Index'))
    }, 'layouts/layouts-footer'
  )
}

const Layout = resolve => {
  require.ensure(
    ['../../layouts/Index'],
    () => {
      resolve(require('../../layouts/Index'))
    }, 'layouts/layouts'
  )
}

module.exports = {
  components: {
    Layout,
    Header,
    Navigation,
    Content,
    Footer,    
  },
  Layout,
  Header,
  Navigation,
  Content,
  Footer,    
}
