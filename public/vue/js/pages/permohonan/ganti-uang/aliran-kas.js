webpackJsonp([89],{CTQU:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Toolbar",{attrs:{slot:"toolbar",judul:t.judul},slot:"toolbar"},[e("RefreshButton",{on:{onRefresh:function(a){t.onRefresh()}}}),t._v(" "),e("BackButton")],1),t._v(" "),t.$root.error.status?e("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[e("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?e("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[e("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),t.pageReady?e("Formulir",{attrs:{slot:"pre-information",column_content:"col-12"},slot:"pre-information"},[e("FormulirInput",{attrs:{slot:"input",readonly:"true",title:"Kegiatan",name:"kegiatan",value:t.get_form.kegiatan,placeholder:"Kegiatan"},slot:"input"}),t._v(" "),e("div",{staticClass:"form-group",attrs:{slot:"input"},slot:"input"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("FormulirInput",{attrs:{readonly:"true",title:"Jenis SPP",name:"",value:"Ganti Uang (GU)",placeholder:"Jenis SPP"}})],1),t._v(" "),e("div",{staticClass:"col"},[e("FormulirInput",{attrs:{readonly:"true",title:"Nomor",name:"",value:t.get_form.nomor_permohonan,placeholder:"Nomor"}})],1)])]),t._v(" "),e("div",{staticClass:"form-group",attrs:{slot:"input"},slot:"input"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("FormulirInput",{attrs:{readonly:"true",title:"KPA",name:"",value:t.undefined_checker(t.get_kegiatan.kpa1),placeholder:"KPA"}})],1),t._v(" "),e("div",{staticClass:"col"},[e("FormulirInput",{attrs:{readonly:"true",title:"Tanggal Pengajuan",name:"",value:t.get_form.tanggal,placeholder:"Tanggal Pengajuan"}})],1)])]),t._v(" "),e("div",{staticClass:"form-group",attrs:{slot:"input"},slot:"input"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("FormulirInput",{attrs:{readonly:"true",title:"PPTK",name:"",value:t.undefined_checker(t.get_kegiatan.pptk1),placeholder:"PPTK"}})],1),t._v(" "),e("div",{staticClass:"col"},[e("FormulirInput",{attrs:{readonly:"true",title:"Total Permohonan (Rp)",name:"",value:t._f("rupiah2")(t.get_form.nominal_diajukan),placeholder:"Total Permohonan (Rp)"}})],1)])])],1):t._e(),t._v(" "),t._m(0),t._v(" "),e("TableView",{attrs:{items:t.get_dpa},scopedSlots:t._u([{key:"default",fn:function(a){return t.get_dpa.length>0?[e("tr",{directives:[{name:"belanja",rawName:"v-belanja",value:a.item.jenis,expression:"scope.item.jenis"}]},[e("td",{staticClass:"align-middle",attrs:{nowrap:""},domProps:{innerText:"kegiatan"==a.item.jenis?"5.2":a.item.kode_rekening}}),t._v(" "),e("td",{staticClass:"align-middle",attrs:{nowrap:""},domProps:{innerHTML:"kegiatan"==a.item.jenis?"BELANJA LANGSUNG":a.item.nama}}),t._v(" "),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(0)))]),t._v(" "),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(0)))]),t._v(" "),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(0)))]),t._v(" "),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(0)))]),t._v(" "),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(0)))]),t._v(" "),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(0)))]),t._v(" "),e("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(a.item.pagu)))])])]:void 0}}])},[e("tr",{staticClass:"bg-primary text-light",attrs:{slot:"thead"},slot:"thead"},[e("th",{staticClass:"align-middle text-light",attrs:{rowspan:"2"}},[t._v("Kode Rekening")]),t._v(" "),e("th",{staticClass:"align-middle text-light",attrs:{rowspan:"2"}},[t._v("Uraian")]),t._v(" "),e("th",{staticClass:"align-middle text-light",attrs:{rowspan:"2"}},[t._v("Aliran Kasa s/d September")]),t._v(" "),e("th",{staticClass:"align-middle text-light",attrs:{colspan:"3"}},[t._v("Total Permohonan Sebelumnya")]),t._v(" "),e("th",{staticClass:"align-middle text-light",attrs:{colspan:"2"}},[t._v("Berkas SPJ")]),t._v(" "),e("th",{staticClass:"align-middle text-light",attrs:{rowspan:"2"}},[t._v("Permohonan Sekarang")])]),t._v(" "),e("tr",{staticClass:"bg-primary text-light",attrs:{slot:"thead"},slot:"thead"},[e("th",{staticClass:"text-center text-light"},[t._v("Di Ajukan")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("Di Setujui")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("Sisa Aliran Kas")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("Penyerahan")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("Verifikasi")])]),t._v(" "),e("tr",{staticClass:"bg-blue-dark column-number",attrs:{slot:"thead"},slot:"thead"},[e("th",{staticClass:"text-center text-light"},[t._v("1")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("2")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("3")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("4")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("5")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("6")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("7")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("8")]),t._v(" "),e("th",{staticClass:"text-center text-light"},[t._v("9")])])]),t._v(" "),e("p"),t._v(" "),e("FormulirButton",{attrs:{slot:"input"},on:{onSubmit:function(a){t.onSubmit()}},slot:"input"})],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"alert alert-icon alert-primary",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),this._v(" \n        Silahkan isi pada nama rekening belanja permohonan.\n    ")])}]}},n4yl:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("NYxO"),n=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t};a.default={computed:n({},Object(s.mapGetters)({get_permohonan:"getters/permohonan/ganti-uang/aliran-kas/permohonan",get_kegiatan:"getters/permohonan/ganti-uang/aliran-kas/kegiatan",get_bendahara:"getters/permohonan/ganti-uang/aliran-kas/bendahara",get_bulan:"getters/permohonan/ganti-uang/aliran-kas/bulan",get_dpa:"getters/permohonan/ganti-uang/aliran-kas/dpa",get_jenis:"getters/permohonan/ganti-uang/aliran-kas/jenis",get_form:"getters/permohonan/ganti-uang/form"}),{undefined_checker:function(){return function(t){return console.log(t),void 0==t?"":t.nama}}}),methods:n({},Object(s.mapActions)({set_aliran_kas:"setters/api/permohonan/ganti-uang/aliran-kas"}),{onInitData:function(){var t=this;this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var a=this.get_form.id;return new Promise(function(e,s){axios.get("permohonan/ganti-uang/"+a+"/aliran-kas").then(function(a){if(void 0==a)return e();t.pageReady=!0,e(t.set_aliran_kas(a.data.data))}).catch(function(t){s(t)})})},onRefresh:function(){this.onInitData()},onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t=this.get_form.id,a=this.get_form,e={id:t,form:a};new Promise(function(a,s){axios.post("permohonan/ganti-uang/"+t+"/aliran-kas",e).then(function(t){a(t)}).catch(function(t){s(t)})})}}),mounted:function(){this.onInitData()},data:function(){return{judul:"Aliran Kas",user:this.$root.level,pageReady:!1}}}},whdw:function(t,a,e){var s=e("VU/8")(e("n4yl"),e("CTQU"),!1,null,null,null);t.exports=s.exports}});