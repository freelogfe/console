webpackJsonp([7],{"1G+u":function(e,t,a){"use strict";function n(e){a("LoYW")}var s=a("rQCC"),r=a("5b3W"),o=a("VU/8"),i=n,l=o(s.a,r.a,!1,i,"data-v-361849fa",null);t.a=l.exports},"5b3W":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[a("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},s=[],r={render:n,staticRenderFns:s};t.a=r},LoYW:function(e,t,a){var n=a("O+Ac");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("10c9c684",n,!0)},"M+MZ":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-table",{staticClass:"resource-list",attrs:{data:e.pagebuildList,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"presentableName",label:"presentableName"}}),e._v(" "),a("el-table-column",{attrs:{prop:"resourceDetail.resourceName",label:"resourceName"}}),e._v(" "),a("el-table-column",{attrs:{width:"80px",label:"status"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.status==e.PAGE_BUILD_STATUS.show?"显示":"隐藏")+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"presentableId",width:"220px",label:"presentableId(for test)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"resourceId",width:"350px",label:"resourceId(for test)"}}),e._v(" "),a("el-table-column",{attrs:{width:"120px",label:"create date"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("fmtDate")(t.row.createDate))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"resourceUrl"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{attrs:{href:t.row.resourceDetail.resourceUrl,target:"_blank"}},[e._v("资源链接")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handlePreview(t.row)}}},[e._v("查看详情\n        ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.status,expression:"scope.row.status==2"}],attrs:{size:"small"},on:{click:function(a){e.setDefaultPageBuildHandler(t.row)}}},[e._v("设为显示\n        ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.status,expression:"scope.row.status==1"}],attrs:{size:"small"},on:{click:function(a){e.setDefaultPageBuildHandler(t.row,2)}}},[e._v("设为隐藏\n        ")])]}}])})],1)],1)},s=[],r={render:n,staticRenderFns:s};t.a=r},"O+Ac":function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,".table-view-wrapper .table[data-v-361849fa]{max-height:100%}.table-view-wrapper .pagination[data-v-361849fa]{margin-top:15px;text-align:center}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console/client/src/components/TableView/index.vue"],names:[],mappings:"AACA,4CACE,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,iBAAmB,CACpB",file:"index.vue",sourcesContent:["\n.table-view-wrapper .table[data-v-361849fa] {\n  max-height: 100%;\n}\n.table-view-wrapper .pagination[data-v-361849fa] {\n  margin-top: 15px;\n  text-align: center;\n}\n"],sourceRoot:""}])},PExb:function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,".resource-list[data-v-62045a12]{width:100%;min-height:600px}","",{version:3,sources:["/Users/daizecheng/workplace/freelog/console/client/src/views/node/page-build/list/index.vue"],names:[],mappings:"AACA,gCACE,WAAY,AACZ,gBAAkB,CACnB",file:"index.vue",sourcesContent:["\n.resource-list[data-v-62045a12] {\n  width: 100%;\n  min-height: 600px;\n}\n"],sourceRoot:""}])},PG49:function(e,t,a){"use strict";var n=a("woOf"),s=a.n(n);t.a={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){return{pageSize:10,page:1}}}},mounted:function(){this.tableData=this.data,this.total=this.tableData.length,this.load()},methods:{load:function(e){var t=this;s()(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var a=e.getData();if(t.loading=!1,a){var n=a.dataList||a;t.formatHandler&&(n=t.formatHandler(n)),t.tableData=n,a.dataList?(t.total=a.totalItem,t.pageMeta.page=a.page||1):t.total=n.length}else t.$message.error(a.msg)}).catch(function(e){t.$message.warning("加载失败"),t.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}}},WJxV:function(e,t,a){"use strict";var n=a("jWBi");t.a=n.a},jWBi:function(e,t,a){"use strict";var n=a("//Fk"),s=a.n(n),r=(a("1G+u"),{show:1,hide:2});t.a={name:"node-page-build-list",data:function(){return{pagebuildList:[],PAGE_BUILD_STATUS:r}},mounted:function(){var e=this;this.loader().then(function(t){console.log(t),e.pagebuildList=t})},methods:{loader:function(){var e=this,t={nodeId:this.$route.params.nodeId};return this.$services.pagebuild.get({params:t}).then(function(t){var a=t.getData(),n=[];return a.forEach(function(t){var a=e.$services.resource.get(t.resourceId).then(function(e){return t.resourceDetail=e.getData(),e});n.push(a)}),s.a.all(n).then(function(e){return t.getData()})})},updateStatus:function(){this.pagebuildList.forEach(function(e){e.status=r.hide})},setDefaultPageBuildHandler:function(e,t){var a=this;t=t||r.show,this.$services.pagebuild.put(e.id,{nodeId:parseInt(this.$route.params.nodeId),status:t}).then(function(n){0===n.data.errcode?(t===r.show&&a.updateStatus(),e.status=t,a.$message.success("设置成功")):a.$message.error(n.data.msg)}).catch(function(e){a.$message.error(e.response.errorMsg)})},handlePreview:function(e){this.$router.push({path:"/node/"+this.$route.params.nodeId+"/presentable/detail",query:{presentableId:e.presentableId}})}}}},oYWP:function(e,t,a){var n=a("PExb");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("7253c832",n,!0)},rQCC:function(e,t,a){"use strict";var n=a("PG49");t.a=n.a},rbfI:function(e,t,a){"use strict";function n(e){a("oYWP")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("WJxV"),r=a("M+MZ"),o=a("VU/8"),i=n,l=o(s.a,r.a,!1,i,"data-v-62045a12",null);t.default=l.exports}});
//# sourceMappingURL=7.5215e1d60c4ea8658efd.js.map