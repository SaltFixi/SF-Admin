"use strict";(self["webpackChunk_17_s_vue"]=self["webpackChunk_17_s_vue"]||[]).push([[120],{30120:function(t,e,a){a.r(e),a.d(e,{default:function(){return f}});var i=function(){var t=this,e=t._self._c;return e("div",[e("a-page-header",{staticStyle:{border:"1px solid rgb(235, 237, 240)"},attrs:{title:"小组件","sub-title":"这是个带分页的下拉组件"},on:{back:()=>null}}),e("SelectWithPage",{staticClass:"SelectWithPage",attrs:{"action-url":"/getlist/select","replace-fields":{id:"id",text:"name"},pageSize:10},on:{change:t.zzz},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1)},s=[],l=function(){var t=this,e=t._self._c;return e("div",[e("a-popover",{attrs:{placement:"bottomLeft",trigger:"click"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[e("template",{slot:"content"},[t._l(t.data,(function(a){return e("p",{key:a.id,staticClass:"content",on:{click:function(e){return t.setVal(a)}}},[t._v(t._s(a.text))])})),e("a-pagination",{staticClass:"flex j-c",attrs:{size:"small",total:t.total,"page-size":t.pageSize},on:{change:t.changePageindex}})],2),e("div",{staticClass:"s-select"},[e("div",[t._v(t._s(t.currentVal?t.currentVal:"请选择"))]),e("a-icon",{staticClass:"select-icon",class:{up:t.visible},attrs:{type:"down"}})],1)],2)],1)},n=[],r={props:{value:{type:[Number,String],default:1},actionUrl:{type:[Number,String],require:!0},replaceFields:{type:Object,default(){return{id:"id",text:"text"}}},pageSize:{type:Number,default:8}},data(){return{visible:!0,currentVal:"",data:[],current:1,total:0}},mounted(){},methods:{setVal(t){this.currentVal=t.text,this.$emit("change",{...t}),this.$emit("input",t.text),this.visible=!1},async getList(){const{data:{list:t,total:e}}=await this.$post(this.actionUrl,{pageindex:this.current,pagesize:this.pageSize}),a=t.map((t=>{const{id:e,text:a}=this.replaceFields;return{id:t[e],text:t[a]}}));this.data=a,this.total=e},changePageindex(t){this.current=t,this.getList()}},created(){this.currentVal=this.data.find((t=>t.id===this.value)),this.getList()}},c=r,u=a(1001),o=(0,u.Z)(c,l,n,!1,null,"751c148d",null),d=o.exports,p={components:{SelectWithPage:d},data(){return{text:0}},methods:{zzz(t){console.log(t)}}},h=p,g=(0,u.Z)(h,i,s,!1,null,"6a1fdc5f",null),f=g.exports}}]);
//# sourceMappingURL=120.c0415684.js.map