webpackJsonp([161],{"Q+Mr":function(t,e,a){var n=a("VU/8")(a("XKxg"),a("h30b"),!1,null,null,null);t.exports=n.exports},XKxg:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("NYxO"),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t};e.default={computed:i({},Object(n.mapGetters)({get_listPegawai:"getters/data-dasar/bendahara/listPegawai"})),methods:i({},Object(n.mapActions)({set_listPegawai:"setters/api/data-dasar/bendahara/listPegawai"}),{onInitData:function(){var t=this;return this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0,new Promise(function(e,a){axios.get("data-dasar/bendahara/create").then(function(a){if(void 0==a)return e();t.AutocompletePegawai(a.data.data.listPegawai),e(t.set_listPegawai(a.data.data.listPegawai))}).catch(function(t){a(t)})})},onRefresh:function(){this.onInitData()},onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t={pegawai_id:this.pegawai_id,nomor_sk:document.getElementById("nomor_sk").value,tanggal_sk:this.tanggal_sk,aktif:document.getElementById("aktif").checked};new Promise(function(e,a){axios.post("data-dasar/bendahara",t).then(function(t){e(t)}).catch(function(t){a(t)})})},onPicker:function(t){this[t.key]=t.value,console.log(t.value)},AutocompletePegawai:function(t){var e=this;this.items_pegawai=[],this.selected_pegawai=null,this.pegawai_id="",new Promise(function(a){t.forEach(function(t){var a=t;a.search=t.nama+" "+t.nip,e.items_pegawai.push(a)}),a()}).then(function(t){e.pageReady=!0})},onSelectedItemPegawai:function(t){this.pegawai_id=t.id}}),mounted:function(){this.onInitData()},data:function(){return{tanggal_sk:null,pageReady:!1,items_pegawai:[],selected_pegawai:null,pegawai_id:""}}}},h30b:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"title",judul:"Creat Data Dasar Bendahara"},slot:"title"},[a("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}}),t._v(" "),a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n  ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),a("Formulir",[a("FormulirLegend",{attrs:{slot:"legend",title:"Creat Data Dasar Bendahara"},slot:"legend"}),t._v(" "),t.pageReady?a("Autocomplete",{attrs:{slot:"input",selected:t.selected_pegawai,items:t.items_pegawai,title:"Pegawai"},on:{onSelectedItem:t.onSelectedItemPegawai},slot:"input",scopedSlots:t._u([{key:"item",fn:function(e){return[t._v("\n                  "+t._s(e.result.nama)+" - "+t._s(e.result.nip)+"\n              ")]}},{key:"selection",fn:function(e){return[t._v("\n                  "+t._s(e.result.nama)+" - "+t._s(e.result.nip)+"\n              ")]}}])}):t._e(),t._v(" "),a("FormulirInput",{attrs:{slot:"input",title:"Nomor SK",name:"nomor_sk",value:"",placeholder:"Nomor SK"},slot:"input"}),t._v(" "),a("FormulirPicker",{attrs:{slot:"input",type:"date",title:"Tanggal SK",name:"tanggal_sk",value:"",placeholder:"Tanggal SK"},on:{onPicker:function(e){t.onPicker({key:"tanggal_sk",value:e})}},slot:"input"}),t._v(" "),a("FormulirSwitch",{attrs:{slot:"input",title:"Aktif",type:"checkbox",name:"aktif",checked:"true"},slot:"input"}),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}}});