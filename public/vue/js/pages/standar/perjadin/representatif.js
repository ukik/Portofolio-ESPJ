webpackJsonp([59],{"0pxY":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"toolbar",judul:t.judul},slot:"toolbar"},[a("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}}),t._v(" "),a("DropdownButton",{staticClass:"mr-2",attrs:{classname:"success",name:"Standar Lainnya"}},[a("a",{directives:[{name:"pointer",rawName:"v-pointer"}],staticClass:"dropdown-item",on:{click:function(e){t.jump({name:"standar-perjadin-harian-dalam-negeri"})}}},[t._v("Harian")]),t._v(" "),a("a",{directives:[{name:"pointer",rawName:"v-pointer"}],staticClass:"dropdown-item",on:{click:function(e){t.jump({name:"standar-perjadin-hotel-dalam-wilayah"})}}},[t._v("Hotel")]),t._v(" "),a("a",{directives:[{name:"pointer",rawName:"v-pointer"}],staticClass:"dropdown-item bg-success text-white",on:{click:function(e){t.jump({name:"standar-perjadin-representatif"})}}},[t._v("Representatif")]),t._v(" "),a("a",{directives:[{name:"pointer",rawName:"v-pointer"}],staticClass:"dropdown-item",on:{click:function(e){t.jump({name:"standar-perjadin-transportasi"})}}},[t._v("Transportasi")]),t._v(" "),a("div",{staticClass:"dropdown-divider"}),t._v(" "),a("a",{directives:[{name:"pointer",rawName:"v-pointer"}],staticClass:"dropdown-item",on:{click:function(e){t.jump({name:"standar-perjadin-honor"})}}},[t._v("Honor")])]),t._v(" "),a("AddButton",{staticClass:"mr-2",attrs:{route:"standar-perjadin-representatif-create",name:"Lokasi"}}),t._v(" "),a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),t.callback_status?a("div",{staticClass:"alert alert-icon alert-info",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.get_callback_message)+"\n    ")]):t._e(),t._v(" "),a("TableView",{attrs:{items:t.get_representatif.data,theads:t.theads,action_visibility:"Super Admin"==t.user},scopedSlots:t._u([{key:"default",fn:function(e){return[a("tr",[a("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.index+1))]),t._v(" "),a("td",{staticClass:"align-middle"},[t._v(t._s(e.item.jabatan))]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(e.item.nominal_luar_wilayah)))]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("rupiah2")(e.item.nominal_dalam_wilayah)))]),t._v(" "),"Super Admin"==t.user?a("td",{staticClass:"text-center"},[a("a",{staticClass:"icon",on:{click:function(a){t.set_form({id:e.item.id}),t.jump({name:"standar-perjadin-representatif-edit"})}}},[a("i",{staticClass:"fe fe-edit"})]),t._v(" "),a("a",{staticClass:"icon",on:{click:function(a){t.onDelete({id:e.item.id})}}},[a("i",{staticClass:"fe fe-trash-2 text-danger"})])]):t._e()])]}}])},[a("Paginator",{attrs:{slot:"paginate",totalPage:t.total_paginate(t.get_representatif.last_page)},on:{btnClick:t.onPaginator},slot:"paginate"})],1)],1)},staticRenderFns:[]}},EctI:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("NYxO"),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};e.default={computed:r({},Object(i.mapGetters)({get_representatif:"getters/standar/perjadin/representatif"})),methods:r({},Object(i.mapActions)({set_representatif:"setters/api/standar/perjadin/representatif",set_form:"setters/non-api/standar/perjadin/representatif/form",set_splice:"setters/non-api/standar/perjadin/representatif/splice"}),{onInitData:function(){var t=this;return this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0,new Promise(function(e,a){axios.get("standar/perjadin/representatif"+t.suffix).then(function(a){if(void 0==a)return e();e(t.set_representatif(a.data.data.representatif))}).catch(function(t){a(t)})})},onRefresh:function(){this.callback_status=!1,this.onInitData()},onDelete:function(t){this.onDeleteConfirmation({url:"standar/perjadin/representatif/"+t.id,id:t.id,bundle:t})}}),mounted:function(){this.get_callback_status&&this.set_callback_reset(),this.onInitData(),this.$memory.set("last_route",this.$route.name)},data:function(){return{callback_status:this.$store.state.callback.callback_status,judul:"Standar Perjalanan Dinas Representatif",user:this.$root.level,theads:[{title:"No",width:"30"},{title:"Jabatan",width:""},{title:"Di Luar Wilayah",width:""},{title:"Dalam Wilayah",width:""},{title:"Aksi",width:"100"}]}}}},Zp78:function(t,e,a){var i=a("VU/8")(a("EctI"),a("0pxY"),!1,null,null,null);t.exports=i.exports}});