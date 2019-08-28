const LoginUser = resolve => {
  require.ensure(
    ['../../../../components/pages/login/user/Index'],
    () => {
      resolve(require('../../../../components/pages/login/user/Index'))
    }, 'pages/login/user'
  )
}

module.exports = {
  LoginUser,
}
