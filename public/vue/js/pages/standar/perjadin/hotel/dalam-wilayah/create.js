webpackJsonp([64],{"1LqO":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("NYxO");e.default={methods:{onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t={jabatan:document.getElementById("jabatan").value,nominal:document.getElementById("nominal").value};new Promise(function(e,a){axios.post("standar/hotel/dalam",t).then(function(t){e(t)}).catch(function(t){a(t)})})}}}},CCMB:function(t,e,a){var r=a("VU/8")(a("1LqO"),a("V0NV"),!1,null,null,null);t.exports=r.exports},V0NV:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"title",judul:"Create Standar Perjadin Hotel"},slot:"title"},[a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),a("Formulir",[a("FormulirLegend",{attrs:{slot:"legend",title:"Create Standar Perjadin Hotel"},slot:"legend"}),t._v(" "),a("FormulirTextarea",{attrs:{slot:"input",title:"Jabatan",name:"jabatan",placeholder:"Jabatan"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Nominal Dalam Wilayah (Rp)",name:"nominal",value:"",placeholder:"Rp. 0"},slot:"input"}),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}}});