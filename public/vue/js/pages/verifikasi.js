webpackJsonp([53],{chcz:function(i,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var i=this;return new Promise(function(e,n){axios.get("verifikasi").then(function(n){i.notif=n.data.data,e(n)}).catch(function(i){n(i)})})},computed:{notification:function(){var i=this;return function(e){for(var n in i.notif)if(i.notif.hasOwnProperty(n)&&e==n)return i.notif[e]}}},data:function(){return{notif:{gu:0,spj:0,honor:0,perjadin:0,spk:0,perubahan_honor:0,perubahan_perjadin:0,perubahan_spk:0},items:[{route:"verifikasi-ganti-uang",judul:"Ganti Uang (GU)",tagline:"Verifikasi Permohonan",icon:"fe fe-message-square",notification:"gu"},{route:"verifikasi-spj",judul:"SPJ",tagline:"Verifikasi SPJ",icon:"fe fe-message-square",notification:"spj"},{route:"verifikasi-honor",judul:"Honor",tagline:"Verifikasi Honor",icon:"fe fe-message-square",notification:"honor"},{route:"verifikasi-perjadin",judul:"SPT",tagline:"Verifikasi SPT",icon:"fe fe-message-square",notification:"perjadin"},{route:"verifikasi-spk",judul:"SPK",tagline:"Verifikasi SPK",icon:"fe fe-message-square",notification:"spk"},{route:"verifikasi-honor",judul:"Perubahan Honor",tagline:"Verifikasi Honor",icon:"fe fe-message-square",notification:"perubahan_honor"},{route:"verifikasi-perjadin-perubahan",judul:"Perubahan SPT",tagline:"Verifikasi SPT",icon:"fe fe-message-square",notification:"perubahan_perjadin"},{route:"verifikasi-spk-perubahan",judul:"Perubahan SPK",tagline:"Verifikasi SPK",icon:"fe fe-message-square",notification:"perubahan_spk"}]}}}},oZuc:function(i,e,n){var t=n("VU/8")(n("chcz"),n("s7QC"),!1,null,null,null);i.exports=t.exports},s7QC:function(i,e){i.exports={render:function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row justify-content-center mt-5"},i._l(i.items,function(e,t){return t<=1?n("div",{key:t,staticClass:"col-md-3 mb-5"},[n("Thumbnails",{directives:[{name:"pointer",rawName:"v-pointer"}],attrs:{item:e,notification:i.notification(e.notification)}})],1):i._e()})),i._v(" "),n("div",{staticClass:"row justify-content-center"},i._l(i.items,function(e,t){return t>=2&t<=4?n("div",{key:t,staticClass:"col-md-3 mb-5"},[n("Thumbnails",{directives:[{name:"pointer",rawName:"v-pointer"}],attrs:{item:e,notification:i.notification(e.notification)}})],1):i._e()})),i._v(" "),n("div",{staticClass:"row justify-content-center"},i._l(i.items,function(e,t){return t>4?n("div",{key:t,staticClass:"col-md-3 mb-5"},[n("Thumbnails",{directives:[{name:"pointer",rawName:"v-pointer"}],attrs:{item:e,notification:i.notification(e.notification)}})],1):i._e()}))])},staticRenderFns:[]}}});