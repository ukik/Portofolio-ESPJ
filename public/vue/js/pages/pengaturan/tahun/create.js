webpackJsonp([94],{"1+L9":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});r("NYxO");e.default={methods:{onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t={tahun:document.getElementById("tahun").value};new Promise(function(e,r){axios.post("pengaturan/tahun",t).then(function(t){e(t)}).catch(function(t){r(t)})})}}}},"10bk":function(t,e,r){var n=r("VU/8")(r("1+L9"),r("xIMr"),!1,null,null,null);t.exports=n.exports},xIMr:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Toolbar",{attrs:{slot:"title",judul:"Create Tahun"},slot:"title"},[r("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}}),t._v(" "),r("BackButton")],1),t._v(" "),t.$root.error.status?r("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[r("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?r("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[r("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),r("Formulir",[r("FormulirLegend",{attrs:{slot:"legend",title:"Tambah Tahun"},slot:"legend"}),t._v(" "),r("FormulirInput",{attrs:{slot:"input",type:"number",title:"Tahun",name:"tahun",value:"",placeholder:"Tahun"},slot:"input"}),t._v(" "),r("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}}});