webpackJsonp([116],{C6eS:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Toolbar",{attrs:{slot:"toolbar",judul:t.judul},slot:"toolbar"},[a("RefreshButton",{on:{onRefresh:function(e){t.onRefresh()}}}),t._v(" "),0==t.get_perjadin.status?a("a",{staticClass:"btn btn-sm btn-outline-primary mr-2",attrs:{href:"#",onclick:"return false;"},on:{click:function(e){t.onAddRAB()}}},[a("i",{staticClass:"fe fe-plus"}),t._v(" Tambah RAB\n        ")]):t._e(),t._v(" "),a("BackButton")],1),t._v(" "),t.$root.error.status?a("div",{staticClass:"alert alert-icon alert-danger",attrs:{role:"alert"}},[a("i",{staticClass:"fe fe-info mr-2",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$root.error.message)+"\n    ")]):t._e(),t._v(" "),t.$root.request?a("div",{staticClass:"alert bg-primary alert-success text-center",attrs:{role:"alert"}},[a("loader-spinner",{tag:"components",staticStyle:{zoom:"0.75"}})],1):t._e(),t._v(" "),a("TableView",{attrs:{items:t.get_biaya,theads:t.theads}},[0==t.get_perjadin.status?a("tr",{staticClass:"bg-primary text-light",attrs:{slot:"thead"},slot:"thead"},t._l(t.theads,function(e,i){return a("th",{directives:[{name:"table-view-th",rawName:"v-table-view-th",value:e.width,expression:"item.width"}],key:i},[t._v(t._s(e.title))])})):t._e(),t._v(" "),a("tbody",{attrs:{slot:"tbody"},slot:"tbody"},t._l(t.get_biaya,function(e,i){return a("tr",{key:i,attrs:{id:"detail["+e.id+"]"}},[a("td",{staticClass:"align-middle text-center"},[t._v(t._s(i+1))]),t._v(" "),a("td",{directives:[{name:"null-info",rawName:"v-null-info",value:e.rincian,expression:"item.rincian"}],staticClass:"align-middle"},[0==t.get_perjadin.status?a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.rincian,expression:"item.rincian",modifiers:{trim:!0}}],staticClass:"form-control form-control-sm",attrs:{type:"text",name:"rincian["+e.id+"]",id:"rincian["+e.id+"]"},domProps:{value:e.rincian},on:{input:function(a){a.target.composing||t.$set(e,"rincian",a.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):t._e(),t._v("\n\n                    "+t._s(0!=t.get_perjadin.status?e.rincian:"")+"\n                ")]),t._v(" "),a("td",{directives:[{name:"nan-info",rawName:"v-nan-info",value:e.volume,expression:"item.volume"}],staticClass:"align-middle text-center"},[0==t.get_perjadin.status?a("input",{directives:[{name:"model",rawName:"v-model.trim.number",value:e.volume,expression:"item.volume",modifiers:{trim:!0,number:!0}}],staticClass:"form-control form-control-sm text-center numeric volume",attrs:{type:"text",name:"volume["+e.id+"]",id:"volume["+e.id+"]"},domProps:{value:e.volume},on:{blur:[function(e){t.onFilterNumberAndDecimal({event:e,index:i,item:"volume"})},function(e){t.$forceUpdate()}],input:function(a){a.target.composing||t.$set(e,"volume",t._n(a.target.value.trim()))}}}):t._e(),t._v("\n\n                    "+t._s(0!=t.get_perjadin.status?e.volume:"")+"\n                ")]),t._v(" "),a("td",{directives:[{name:"null-info",rawName:"v-null-info",value:e.satuan,expression:"item.satuan"}],staticClass:"align-middle text-center"},[0==t.get_perjadin.status?a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.satuan,expression:"item.satuan",modifiers:{trim:!0}}],staticClass:"form-control form-control-sm text-center satuan",attrs:{type:"text",name:"satuan["+e.id+"]",id:"satuan["+e.id+"]"},domProps:{value:e.satuan},on:{input:function(a){a.target.composing||t.$set(e,"satuan",a.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):t._e(),t._v("\n\n                    "+t._s(0!=t.get_perjadin.status?e.satuan:"")+"\n\n                ")]),t._v(" "),a("td",{directives:[{name:"nan-info",rawName:"v-nan-info",value:e.harga,expression:"item.harga"}],staticClass:"align-middle text-right"},[0==t.get_perjadin.status?a("input",{directives:[{name:"model",rawName:"v-model.trim.number",value:e.harga,expression:"item.harga",modifiers:{trim:!0,number:!0}}],staticClass:"form-control form-control-sm text-right numeric harga",attrs:{type:"text",name:"harga["+e.id+"]",id:"harga["+e.id+"]"},domProps:{value:e.harga},on:{blur:[function(e){t.onFilterNumberAndDecimal({event:e,index:i,item:"harga"})},function(e){t.$forceUpdate()}],input:function(a){a.target.composing||t.$set(e,"harga",t._n(a.target.value.trim()))}}}):t._e(),t._v("\n\n                    "+t._s(0!=t.get_perjadin.status?e.harga:"")+"\n\n                ")]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[0==t.get_perjadin.status?a("input",{staticClass:"form-control form-control-sm text-right numeric jumlah",attrs:{type:"text",name:"jumlah["+e.id+"]",id:"jumlah["+e.id+"]",disabled:""},domProps:{value:t._f("rupiah2")(e.jumlah)}}):t._e(),t._v("\n\n                    "+t._s(0!=t.get_perjadin.status?e.jumlah:"")+"\n\n                ")]),t._v(" "),a("td",{staticClass:"align-middle text-right"},[0==t.get_perjadin.status?a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.keterangan,expression:"item.keterangan",modifiers:{trim:!0}}],staticClass:"form-control form-control-sm",attrs:{type:"text",name:"keterangan["+e.id+"]",id:"keterangan["+e.id+"]"},domProps:{value:e.keterangan},on:{input:function(a){a.target.composing||t.$set(e,"keterangan",a.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):t._e(),t._v("\n\n                    "+t._s(0!=t.get_perjadin.status?e.keterangan:"")+"\n\n                ")]),t._v(" "),0==t.get_perjadin.status?a("td",{staticClass:"align-middle text-center"},[a("a",{staticClass:"icon",on:{click:function(e){t.onDelete(i)}}},[a("i",{staticClass:"fe fe-trash-2 text-danger"})])]):t._e()])})),t._v(" "),a("template",{slot:"tfoot"},[a("tr",{staticClass:"bg-light"},[a("th",{staticClass:"text-right",attrs:{colspan:"6"}},[t._v("Total :")]),t._v(" "),a("th",{staticClass:"text-right"},[t._v(t._s(t._f("rupiah2")(t.nominal)))]),t._v(" "),a("th",{attrs:{colspan:0!=t.get_perjadin.status?1:2}})])])],2),t._v(" "),a("FormulirButton",{attrs:{slot:"button"},on:{onSubmit:function(e){t.onSubmit()}},slot:"button"})],1)},staticRenderFns:[]}},aHl5:function(t,e,a){var i=a("VU/8")(a("aloR"),a("C6eS"),!1,null,null,null);t.exports=i.exports},aloR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("NYxO"),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};e.default={computed:n({},Object(i.mapGetters)({get_perjadin:"getters/lampiran/perjadin/detail/perjadin",get_biaya:"getters/lampiran/perjadin/detail/biaya",get_form:"getters/lampiran/perjadin/form",get_form_detail:"getters/lampiran/perjadin/detail/form"})),watch:{get_biaya:{handler:function(t,e){for(var a=0,i=0;i<t.length;i++)isNaN(t[i].volume)||isNaN(t[i].harga)||(t[i].jumlah=t[i].volume*t[i].harga,a+=t[i].jumlah);this.nominal=a},deep:!0}},methods:n({},Object(i.mapActions)({set_biaya:"setters/api/lampiran/perjadin/detail/biaya"}),{onInitData:function(){var t=this;this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var e=this.get_form.id,a=this.get_form_detail.id;return new Promise(function(i,n){axios.get("lampiran/perjadin/"+e+"/detail/"+a+"/biaya").then(function(e){if(void 0==e)return i();i(t.set_biaya(e.data.data))}).catch(function(t){n(t)})})},onRefresh:function(){this.onInitData()},onSubmit:function(){this.$root.error.status=!1,this.$root.error.message="",this.$root.request=!0;var t=this.get_form.id,e=this.get_form_detail.id,a={};if(0==this.get_perjadin.status){var i={};this.get_biaya.forEach(function(t,e){var a=document.getElementById("rincian["+t.id+"]").value;i[t.id]=a});var n={};this.get_biaya.forEach(function(t,e){var a=document.getElementById("volume["+t.id+"]").value;n[t.id]=a});var r={};this.get_biaya.forEach(function(t,e){var a=document.getElementById("satuan["+t.id+"]").value;r[t.id]=a});var s={};this.get_biaya.forEach(function(t,e){var a=document.getElementById("harga["+t.id+"]").value;s[t.id]=a});var o={};this.get_biaya.forEach(function(t,e){var a=document.getElementById("keterangan["+t.id+"]").value;o[t.id]=a}),a={rincian:i,volume:n,satuan:r,harga:s,keterangan:o}}new Promise(function(i,n){axios.put("lampiran/perjadin/"+t+"/detail/"+e+"/biaya",a).then(function(t){i(t)}).catch(function(t){n(t)})})},onDelete:function(t){this.get_biaya.splice(t,1)},onAddRAB:function(){this.get_biaya.push({id:this.get_biaya+1,urut:this.get_biaya+1,perjadin_id:this.get_biaya+1,perjadin_detail_id:this.get_biaya+1,rincian:"",harga:0,volume:0,satuan:"",jumlah:0,keterangan:null,created_at:"",updated_at:""})}}),mounted:function(){var t,e;this.onInitData(),this.nominal=(t=this.get_biaya,e=0,t.forEach(function(t){isNaN(t.volume)||isNaN(t.harga)||(e+=t.volume*t.harga)}),e)},data:function(){return{judul:"Rincian Perhitungan Perjalanan Dinas"+this.$store.state.lampiran_perjadin_detail.form.pegawai_nama,user:"Super Admin",nominal:0,theads:[{title:"No",width:"30"},{title:"Uraian",width:"0"},{title:"Volume",width:"80"},{title:"Satuan",width:"120"},{title:"Harga",width:"120"},{title:"Jumlah",width:"160"},{title:"Keterangan",width:"0"},{title:"Aksi",width:"50"}]}}}}});