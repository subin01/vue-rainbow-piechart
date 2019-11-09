!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-rainbow-piechart",[],e):"object"==typeof exports?exports["vue-rainbow-piechart"]=e():t["vue-rainbow-piechart"]=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){r(!function(){var t=new Error('Cannot find module "!!vue-style-loader!css-loader?minimize!../node_modules/vue-loader/lib/style-compiler/index?{"id":"data-v-63906ace","scoped":false,"hasInlineConfig":false}!scss-loader!../node_modules/vue-loader/lib/selector?type=styles&index=0!./VueRainbowPiechart.vue"');throw t.code="MODULE_NOT_FOUND",t}());var n=r(1)(r(2),r(3),null,null);t.exports=n.exports},function(t,e){t.exports=function(t,e,r,n){var o,i=t=t||{},s=typeof t["default"];"object"!==s&&"function"!==s||(o=t,i=t["default"]);var a="function"==typeof i?i.options:i;if(e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns),r&&(a._scopeId=r),n){var c=Object.create(a.computed||null);Object.keys(n).forEach(function(t){var e=n[t];c[t]=function(){return e}}),a.computed=c}return{esModule:o,exports:i,options:a}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"RainbowPieChart",props:{list:{type:Array,required:!0},rotate:{type:Boolean,"default":!0},autoplay:{type:Boolean,"default":!0}},data:function(){return{rotation:0,active:0,timer:null}},computed:{degree:function(){return 360/this.parts},parts:function(){return this.list.length},theD:function(){return this.describeArc(150,150,100,0,this.degree)}},mounted:function(){this.cycle()},methods:{polarToCartesian:function(t,e,r,n){var o=(n-90)*Math.PI/180;return{x:t+r*Math.cos(o),y:e+r*Math.sin(o)}},describeArc:function(t,e,r,n,o){var i=this.polarToCartesian(t,e,r,o),s=this.polarToCartesian(t,e,r,n),a=o-n<=180?"0":"1",c=["M",i.x,i.y,"A",r,r,0,a,0,s.x,s.y].join(" ");return c},getColor:function(t,e){return this.list[t].color?this.list[t].color:"hsl("+e*t+", 70%, 50%)"},getRotation:function(t,e){return{transform:"rotate(-"+e*t+"deg)"}},getTransform:function(){return{transform:"rotate("+this.rotation+"deg)"}},handleHoverOut:function(){this.cycle()},handleHover:function(t){this.rotate&&(this.rotation=360/this.parts*t),this.active=t,clearInterval(this.timer)},cycle:function(){var t=this;"undefined"!=typeof window&&this.autoplay&&(this.timer=setInterval(function(){t.active=t.active+1<t.parts?t.active+1:0,t.rotate&&(t.rotation=360/t.parts*t.active)},2e3))}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"rbp"},[r("section",{staticClass:"rbp__canvas"},[r("div",{staticClass:"rbp__rotator-wrap"},[r("div",{staticClass:"rbp__rotator",style:t.getTransform()},[r("svg",{attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 300 300",id:"rbp_part_bg"}},[r("ellipse",{attrs:{fill:"none",cx:"150",cy:"150",rx:"122",ry:"122"}})]),t._v(" "),t._l(t.list,function(e,n){return r("svg",{key:n,"class":{"rbp--active":n===t.active},style:t.getRotation(n,t.degree),attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 300 300",id:"rbp_part_"+n}},[r("path",{style:{stroke:t.getColor(n,t.degree)},attrs:{d:t.theD}})])})],2)])]),t._v(" "),r("section",{staticClass:"rbp__legend"},[r("ul",t._l(t.list,function(e,n){return r("li",{key:n,"class":{"rbp--active":n===t.active}},[r("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.handleHover(n)},mouseover:function(e){return t.handleHover(n)},mouseout:function(e){return t.handleHoverOut()}}},[r("span",{style:{backgroundColor:t.getColor(n,t.degree)}}),t._v("\n          "+t._s(e.key)+"\n        ")])])}),0)]),t._v(" "),r("section",{staticClass:"rbp__details"},[r("ul",t._l(t.list,function(e,n){return r("li",{key:n,"class":{"rbp--active":n===t.active},domProps:{innerHTML:t._s(e.value)}})}),0)])])},staticRenderFns:[]}}])});