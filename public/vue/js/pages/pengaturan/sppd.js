webpackJsonp([96],{"JL+x":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"title",judul:"Pengaturan SPPD"},slot:"title"},[a("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}}),t._v(" "),a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),t.callback_status?a("div",{staticClass:"alert alert-icon alert-info",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.get_callback_message)+"\n    ")]):t._e(),t._v(" "),a("Formulir",[a("FormulirLegend",{attrs:{slot:"legend",title:"Limit"},slot:"legend"}),t._v(" "),a("FormulirInput",{attrs:{slot:"input",name:"limit",value:t.valued(".sppd.limit"),placeholder:"0",title:"Limit Melakukan Perjalanan Dinas Tiap Bulannya"},slot:"input"}),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}},r8zK:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("NYxO");e.default={computed:{valued:function(){var t=this;return function(e){var a=t.$root.year+e;for(var r in t.sppd)if(t.sppd.hasOwnProperty(r)&&r==a)return t.sppd[r]}}},methods:{onInitData:function(){var t=this;this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0,this.callback_status=!1;var e=[this.$root.year+".sppd.limit"];return new Promise(function(a,r){axios.get("pengaturan/sppd?orientation="+e.join(",")).then(function(e){if(void 0==e)return a();t.sppd=e.data.data.sppd,a(e)}).catch(function(t){r(t)})})},onRefresh:function(){this.onInitData()},onSubmit:function(){var t=this;this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0,this.callback_status=!1;var e={},a=(this.$root.year+".sppd.limit").split(".").join("_").toLowerCase();e[a]=document.getElementById("limit").value,new Promise(function(t,a){axios.post("pengaturan/sppd",e).then(function(e){t(e)}).catch(function(t){a(t)})}).then(function(e){t.callback_status=t.$store.state.callback.callback_status})}},mounted:function(){this.get_callback_status&&this.set_callback_reset(),this.onInitData(),this.$memory.set("last_route",this.$route.name)},data:function(){var t=(new Date).getFullYear();return{callback_status:this.$store.state.callback.callback_status,year:t,sppd:{}}}}},ybhh:function(t,e,a){var r=a("VU/8")(a("r8zK"),a("JL+x"),!1,null,null,null);t.exports=r.exports}});