webpackJsonp([128],{CxVy:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"title",judul:"Creat Data Dasar Rekanan"},slot:"title"},[a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),a("Formulir",[a("FormulirLegend",{attrs:{slot:"legend",title:"Creat Data Dasar Rekanan"},slot:"legend"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Nama",name:"nama_perusahaan",value:"",placeholder:"Nama"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Pimpinan",name:"nama_pimpinan",value:"",placeholder:"Pimpinan"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"NPWP",name:"npwp",value:"",placeholder:"NPWP"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Telpon",name:"telp",value:"",placeholder:"Telpon"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Fax",name:"fax",value:"",placeholder:"Fax"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Email",name:"email",value:"",placeholder:"Email"},slot:"input"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Website",name:"website",value:"",placeholder:"Website"},slot:"input"}),t._v(" "),a("FormulirTextarea",{attrs:{slot:"input",title:"Alamat",name:"alamat",placeholder:"Alamat"},slot:"input"}),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}},GUR5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("NYxO"),l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t};e.default={computed:l({},Object(n.mapGetters)({get_form:"getters/data-dasar/rekanan/form"})),methods:{onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t={nama_perusahaan:document.getElementById("nama_perusahaan").value,nama_pimpinan:document.getElementById("nama_pimpinan").value,npwp:document.getElementById("npwp").value,telp:document.getElementById("telp").value,fax:document.getElementById("fax").value,email:document.getElementById("email").value,website:document.getElementById("website").value,alamat:document.getElementById("alamat").value};new Promise(function(e,a){axios.post("data-dasar/rekanan",t).then(function(t){e(t)}).catch(function(t){a(t)})})}}}},KHDd:function(t,e,a){var n=a("VU/8")(a("GUR5"),a("CxVy"),!1,null,null,null);t.exports=n.exports}});