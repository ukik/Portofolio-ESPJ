webpackJsonp([81],{d6Hq:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("NYxO"),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])}return t};e.default={computed:i({},Object(s.mapGetters)({get_spj:"getters/spj"}),{undefined_checker:function(){return function(t){return void 0==t?"":t.nomor_permohonan}}}),methods:i({},Object(s.mapActions)({set_spj:"setters/api/spj",set_form:"setters/non-api/spj/form",set_splice:"setters/non-api/spj/splice",set_replace:"setters/non-api/spj/replace"}),{onInitData:function(){var t=this;return this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0,new Promise(function(e,a){axios.get("spj"+t.suffix).then(function(a){if(void 0==a)return e();e(t.set_spj(a.data.data.spj))}).catch(function(t){a(t)})})},onRefresh:function(){this.callback_status=!1,this.onInitData()},onAjukan:function(t){this.onAjukanConfirmation({url:"spj/"+t.id+"/submit",id:t.id,bundle:t})}}),mounted:function(){this.get_callback_status&&this.set_callback_reset(),this.onInitData(),this.$memory.set("last_route",this.$route.name)},data:function(){return{callback_status:this.$store.state.callback.callback_status,judul:"Daftar SPJ",theads:[{title:"No",width:"30"},{title:"Tanggal",width:"0"},{title:"Nomor Permohonan",width:"0"},{title:"Kode",width:"0"},{title:"Kegiatan",width:"0"},{title:"Diajukan",width:"0"},{title:"Disetujui",width:"0"},{title:"Nominal",width:"0"},{title:"Sisa SPJ",width:"0"},{title:"Status",width:"0"},{title:"Aksi",width:"100"}]}}}},"jSu/":function(t,e,a){var s=a("VU/8")(a("d6Hq"),a("tpVO"),!1,null,null,null);t.exports=s.exports},tpVO:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"toolbar",judul:t.judul},slot:"toolbar"},[a("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}})],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),t.callback_status?a("div",{staticClass:"alert alert-icon alert-info",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.get_callback_message)+"\n    ")]):t._e(),t._v(" "),a("TableView",{attrs:{items:t.get_spj.data,theads:t.theads},scopedSlots:t._u([{key:"default",fn:function(e){return[a("tr",[a("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.index+1))]),t._v(" "),a("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.item.tanggal))]),t._v(" "),a("td",{staticClass:"align-middle text-center"},[t._v(t._s(t.undefined_checker(e.item.permohonan)))]),t._v(" "),a("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.item.kode_dpa))]),t._v(" "),a("td",{staticClass:"align-middle"},[t._v(t._s(e.item.kegiatan))]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(e.item.nominal_diajukan)))]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(e.item.nominal_disetujui)))]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(e.item.nominal_spj)))]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(e.item.nominal_sisa)))]),t._v(" "),a("td",{directives:[{name:"tag-info",rawName:"v-tag-info",value:e.item.status,expression:"scope.item.status"}],staticClass:"align-middle text-center"}),t._v(" "),a("td",{staticClass:"text-center"},[e.item.status<0?a("a",{staticClass:"icon mr-1",attrs:{"data-method":"PUT","data-action":"ajukan"},on:{click:function(a){t.onAjukan({id:e.item.id,status:0})}}},[a("i",{staticClass:"fe fe-send"})]):t._e(),t._v(" "),a("a",{staticClass:"icon",on:{click:function(a){t.set_form({id:e.item.id}),t.jump({name:"spj-rekap"})}}},[a("i",{staticClass:"fe fe-list"})]),t._v(" "),a("a",{staticClass:"icon",on:{click:function(a){t.set_form({id:e.item.id}),t.jump({name:"spj-berkas"})}}},[a("i",{staticClass:"fe fe-file-text"})])])])]}}])},[a("Paginator",{attrs:{slot:"paginate",totalPage:t.total_paginate(t.get_spj.last_page)},on:{btnClick:t.onPaginator},slot:"paginate"})],1)],1)},staticRenderFns:[]}}});