webpackJsonp([34],{"8ISA":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={props:{item:{type:Object,default:"",required:!0},notification:{default:""}}}},WWLV:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"card h-100"},[e("div",{staticClass:"card-body p3 text-center",on:{click:function(i){t.jump({name:t.item.route})}}},[e("a",{staticClass:"btn-dashboard"},[e("i",{class:t.item.icon}),t._v(" "),e("div",[t._v(t._s(t.item.judul))])]),t._v(" "),void 0==t.notification||t.notification<=0?e("p",{staticClass:"text-muted"},[t._v(t._s(t.item.tagline))]):t._e(),t._v(" "),void 0!=t.notification&&t.notification>0?e("p",{staticClass:"text-muted",domProps:{innerHTML:t._f("notification")(t.notification,t.item.tagline)}}):t._e()])])},staticRenderFns:[]}},sfO3:function(t,i,e){var n=e("VU/8")(e("8ISA"),e("WWLV"),!1,null,null,null);t.exports=n.exports}});