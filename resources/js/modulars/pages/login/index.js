const { LoginUser } = require('./user/index')

const Login = resolve => {
  require.ensure(
    ['../../../components/pages/login/Index'],
    () => {
      resolve(require('../../../components/pages/login/Index'))
    }, 'pages/login'
  )
}

module.exports = {
  components: {
    Login
  },
  Login,
  LoginUser,
}
