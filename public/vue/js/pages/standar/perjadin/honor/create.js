webpackJsonp([67],{"E+yT":function(a,t,e){var n=e("VU/8")(e("VT1y"),e("fNBC"),!1,null,null,null);a.exports=n.exports},VT1y:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});e("NYxO");t.default={methods:{onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var a={golongan:document.getElementById("golongan").value,nominal:document.getElementById("nominal").value};new Promise(function(t,e){axios.post("standar/honor",a).then(function(a){t(a)}).catch(function(a){e(a)})})}},data:function(){return{golongan:[{label:"I/a",keterangan:"Juru Muda"},{label:"I/b",keterangan:"Juru Muda Tingkat I"},{label:"I/c",keterangan:"Juru"},{label:"I/d",keterangan:"Juru Tingkat I"},{label:"II/a",keterangan:"Pengatur Muda"},{label:"II/b",keterangan:"Pengatur Muda Tingkat I"},{label:"II/c",keterangan:"Pengatur"},{label:"II/d",keterangan:"Pengatur Tingkat I"},{label:"III/a",keterangan:"Penata Muda"},{label:"III/b",keterangan:"Penata Muda Tingkat I"},{label:"III/c",keterangan:"Penata"},{label:"III/d",keterangan:"Penata Tingkat I"},{label:"IV/a",keterangan:"Pembina"},{label:"IV/b",keterangan:"Pembina Tingkat I"},{label:"IV/c",keterangan:"Pembina Utama Muda"},{label:"IV/d",keterangan:"Pembina Utama Madya"},{label:"IV/e",keterangan:"Pembina Utama"},{label:"Non PNS",keterangan:"Honorer/Kontrak"}]}}}},fNBC:function(a,t){a.exports={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("Toolbar",{attrs:{slot:"title",judul:"Create Standar Perjadin Harian"},slot:"title"},[e("BackButton")],1),a._v(" "),a.$root.error.status?e("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[e("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),a._v(" "+a._s(a.$root.error.message)+"\n    ")]):a._e(),a._v(" "),a.$root.request?e("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[e("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):a._e(),a._v(" "),e("Formulir",[e("FormulirLegend",{attrs:{slot:"legend",title:"Create Standar Perjadin Harian"},slot:"legend"}),a._v(" "),e("FormulirDropdown",{attrs:{slot:"input",title:"Golongan/Eselon"},slot:"input"},[e("div",{staticClass:"input-group",attrs:{slot:"default"},slot:"default"},[e("select",{staticClass:"form-control custom-select submit-on-change",attrs:{name:"golongan",id:"golongan"}},[e("option",{attrs:{value:""}},[a._v("- Pilih Golongan/Eselon -")]),a._v(" "),a._l(a.golongan,function(t,n){return e("option",{key:n,domProps:{value:t.label}},[a._v("\n                        "+a._s(t.label)+" - "+a._s(t.keterangan)+"  ")])})],2)])]),a._v(" "),e("FormulirInput",{attrs:{slot:"input",title:"Nominal (Rp)",name:"nominal",value:"",placeholder:"Rp. 0"},slot:"input"}),a._v(" "),e("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(t){a.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}}});