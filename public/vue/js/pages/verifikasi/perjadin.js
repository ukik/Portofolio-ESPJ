webpackJsonp([48],{"6EaT":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"toolbar",judul:t.judul},slot:"toolbar"},[a("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}}),t._v(" "),a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),t.callback_status?a("div",{staticClass:"alert alert-icon alert-info",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.get_callback_message)+"\n    ")]):t._e(),t._v(" "),a("TableView",{attrs:{items:t.get_perjadin.data,theads:t.theads},scopedSlots:t._u([{key:"default",fn:function(e){return[a("tr",[a("td",{staticClass:"text-center"},[t._v(t._s(e.index+1))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.item.nomor_spt))]),t._v(" "),a("td",[t._v(t._s(e.item.tempat_tujuan))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.item.tanggal_berangkat))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.item.tanggal_kembali))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.item.lama_perjalanan)+" hari ")]),t._v(" "),a("td",{directives:[{name:"status-info",rawName:"v-status-info",value:e.item.status,expression:"scope.item.status"}],staticClass:"align-middle text-center"}),t._v(" "),a("td",{staticClass:"text-center"},[a("a",{staticClass:"icon",attrs:{title:"Verifikasi Permohonan"},on:{click:function(a){t.set_form({id:e.item.id}),t.jump({name:"verifikasi-perjadin-review"})}}},[a("i",{staticClass:"fe fe-search"})])])])]}}])},[a("Paginator",{attrs:{slot:"paginate",totalPage:t.total_paginate(t.get_perjadin.last_page)},on:{btnClick:t.onPaginator},slot:"paginate"})],1)],1)},staticRenderFns:[]}},CvLi:function(t,e,a){var s=a("VU/8")(a("kASs"),a("6EaT"),!1,null,null,null);t.exports=s.exports},kASs:function(t,e){}});