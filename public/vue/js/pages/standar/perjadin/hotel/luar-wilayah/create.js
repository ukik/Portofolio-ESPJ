webpackJsonp([61],{"/E6x":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("NYxO"),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t};e.default={computed:s({},Object(n.mapGetters)({get_listLokasi:"getters/standar/hotel/luar/edit/listLokasi"})),methods:s({},Object(n.mapActions)({set_edit:"setters/api/standar/hotel/luar/edit"}),{onInitData:function(){var t=this;return this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0,new Promise(function(e,a){axios.get("standar/hotel/luar/create").then(function(a){if(void 0==a)return e();console.log(a.data.data),e(t.set_edit(a.data.data))}).catch(function(t){a(t)})})},onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t=document.getElementById("jabatan").value,e={};this.get_listLokasi.forEach(function(t,a){t.sub.forEach(function(t,a){var n=t.id,s=document.getElementById("nominal["+t.id+"]").value;e[n]=null==s?0:s})});var a={jabatan:t,nominal:e};new Promise(function(t,e){axios.post("standar/hotel/luar/",a).then(function(e){t(e)}).catch(function(t){e(t)})})}}),mounted:function(){this.onInitData()},data:function(){return{theads:[{title:"No",width:""},{title:"Provisi/Kota/Kabupaten/Kecamatan",width:""},{title:"Nominal ($)",width:""}]}}}},Mveo:function(t,e,a){var n=a("VU/8")(a("/E6x"),a("dWkb"),!1,null,null,null);t.exports=n.exports},dWkb:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"title",judul:"Create Standar Perjadin Hotel"},slot:"title"},[a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),a("Formulir",{attrs:{column_content:"col-12"}},[a("FormulirLegend",{attrs:{slot:"legend",title:"Create Standar Perjadin Hotel"},slot:"legend"}),t._v(" "),a("FormulirTextarea",{attrs:{slot:"input",title:"Jabatan",name:"jabatan",value:"",placeholder:"Jabatan"},slot:"input"}),t._v(" "),a("TableView",{attrs:{slot:"input",items:t.get_listLokasi,theads:t.theads},slot:"input",scopedSlots:t._u([{key:"default",fn:function(e){return[a("tr",{staticClass:"font-weight-bold"},[a("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.index+1))]),t._v(" "),a("td",{staticClass:"align-middle"},[t._v(t._s(e.item.nama))]),t._v(" "),a("td",{staticClass:"align-middle text-center",attrs:{colspan:"2"}})]),t._v(" "),t._l(e.item.sub,function(n,s){return a("tr",{key:s+"-"+e.index,staticClass:"font-italic"},[a("td",{staticClass:"align-middle text-center"},[t._v(t._s(e.index+1)+"."+t._s(s+1))]),t._v(" "),a("td",{staticClass:"align-middle"},[t._v(t._s(e.item.nama)+" - "+t._s(n.singkatan))]),t._v(" "),a("td",{staticClass:"cell-condensed"},[a("input",{staticClass:"form-control form-control-sm numeric",attrs:{type:"text",name:"nominal["+n.id+"]",id:"nominal["+n.id+"]",value:"",placeholder:t._f("rupiah")(0,"$")}})])])})]}}])}),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)],1)},staticRenderFns:[]}}});