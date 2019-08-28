const {
  PermohonanGantiUang,
  PermohonanGantiUangCreate,
  PermohonanGantiUangEdit,
  PermohonanGantiUangAliranKas,
} = require('./ganti-uang/index')
const {
  PermohonanUangPersediaan,
  PermohonanUangPersediaanCreate,
  PermohonanUangPersediaanEdit,
} = require('./uang-persediaan/index')

module.exports = {
  PermohonanGantiUang,
  PermohonanGantiUangCreate,
  PermohonanGantiUangEdit,
  PermohonanGantiUangAliranKas,
  
  PermohonanUangPersediaan,
  PermohonanUangPersediaanCreate,
  PermohonanUangPersediaanEdit,
}
