const LampiranPerjadinPerubahanDetailBiaya = resolve => {
  require.ensure(
    ['../../../../../../../components/pages/lampiran/perjadin/perubahan/detail/biaya/Index'],
    () => {
      resolve(require('../../../../../../../components/pages/lampiran/perjadin/perubahan/detail/biaya/Index'))
    }, 'pages/lampiran/perjadin/perubahan/detail/biaya'
  )
}

module.exports = {
  LampiranPerjadinPerubahanDetailBiaya,
}
