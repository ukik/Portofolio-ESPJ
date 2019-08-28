const { RekapPerjadin } = require('./perjadin/index')
const { RekapSpj } = require('./spj/index')
const { RekapHonor } = require('./honor/index')

const Rekap = resolve => {
  require.ensure(
    ['../../../components/pages/rekap/Index'],
    () => {
      resolve(require('../../../components/pages/rekap/Index'))
    }, 'pages/rekap'
  )
}

module.exports = {
  Rekap,
  RekapPerjadin,
  RekapSpj,
  RekapHonor,
}
