webpackJsonp([127],{"5/nr":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"title",judul:"Edit Data Dasar Rekanan"},slot:"title"},[a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),a("Formulir",[a("FormulirLegend",{attrs:{slot:"legend",title:"Edit Data Dasar Rekanan"},slot:"legend"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Nama",name:"nama_perusahaan",placeholder:"Nama"},slot:"input",model:{value:t.get_form.nama_perusahaan,callback:function(e){t.$set(t.get_form,"nama_perusahaan",e)},expression:"get_form.nama_perusahaan"}}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Pimpinan",name:"nama_pimpinan",placeholder:"Pimpinan"},slot:"input",model:{value:t.get_form.nama_pimpinan,callback:function(e){t.$set(t.get_form,"nama_pimpinan",e)},expression:"get_form.nama_pimpinan"}}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"NPWP",name:"npwp",placeholder:"NPWP"},slot:"input",model:{value:t.get_form.npwp,callback:function(e){t.$set(t.get_form,"npwp",e)},expression:"get_form.npwp"}}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Telpon",name:"telp",placeholder:"Telpon"},slot:"input",model:{value:t.get_form.telp,callback:function(e){t.$set(t.get_form,"telp",e)},expression:"get_form.telp"}}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Fax",name:"fax",placeholder:"Fax"},slot:"input",model:{value:t.get_form.fax,callback:function(e){t.$set(t.get_form,"fax",e)},expression:"get_form.fax"}}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Email",name:"email",placeholder:"Email"},slot:"input",model:{value:t.get_form.email,callback:function(e){t.$set(t.get_form,"email",e)},expression:"get_form.email"}}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Website",name:"website",placeholder:"Website"},slot:"input",model:{value:t.get_form.website,callback:function(e){t.$set(t.get_form,"website",e)},expression:"get_form.website"}}),t._v(" "),a("FormulirTextarea",{attrs:{slot:"input",title:"Alamat",name:"alamat",placeholder:"Alamat"},slot:"input",model:{value:t.get_form.alamat,callback:function(e){t.$set(t.get_form,"alamat",e)},expression:"get_form.alamat"}}),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}},ILpZ:function(t,e,a){var n=a("VU/8")(a("fj9v"),a("5/nr"),!1,null,null,null);t.exports=n.exports},fj9v:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("NYxO"),l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t};e.default={computed:l({},Object(n.mapGetters)({get_form:"getters/data-dasar/rekanan/form"})),methods:{onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t=this.get_form.id,e=document.getElementById("nama_perusahaan").value,a=document.getElementById("nama_pimpinan").value,n=document.getElementById("npwp").value,l=document.getElementById("telp").value,o=document.getElementById("fax").value,r=document.getElementById("email").value,i=document.getElementById("website").value,s=document.getElementById("alamat").value,m={id:t,nama_perusahaan:e,nama_pimpinan:a,npwp:n,telp:l,fax:o,email:r,website:i,alamat:s};new Promise(function(e,a){axios.put("data-dasar/rekanan/"+t,m).then(function(t){e(t)}).catch(function(t){a(t)})})}}}}});