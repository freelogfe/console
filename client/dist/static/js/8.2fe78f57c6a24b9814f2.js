webpackJsonp([8],{"1G+u":function(e,t,a){"use strict";var n=a("rQCC"),s=a("JrhV"),r=a.n(s),i=a("VU/8")(n.a,r.a,!1,function(e){a("qD+J")},"data-v-212a221a",null);t.a=i.exports},"5/8l":function(e,t,a){var n=a("MvIb");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("3c7a9e92",n,!0,{})},Eoec:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-table",{staticClass:"resource-list",attrs:{data:e.pagebuildList,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"presentableName",label:"presentable名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"resourceDetail.resourceName",label:"资源名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"presentableId",width:"220px",label:"presentableId(for test)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"resourceId",width:"350px",label:"资源id(for test)"}}),e._v(" "),a("el-table-column",{attrs:{width:"120px",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(e._f("fmtDate")(t.row.createDate))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"资源链接（for test）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{attrs:{href:t.row.resourceDetail.resourceUrl,target:"_blank"}},[e._v("资源链接")])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"100px",label:"展示状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:t.row.statusInfo.type}},[e._v(e._s(t.row.statusInfo.desc))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handlePreview(t.row)}}},[e._v("查看详情\n        ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.status,expression:"scope.row.status==2"}],attrs:{size:"small",type:"primary"},on:{click:function(a){e.setDefaultPageBuildHandler(t.row)}}},[e._v("设为展示\n        ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.status,expression:"scope.row.status==1"}],attrs:{size:"small",type:"warning"},on:{click:function(a){e.setDefaultPageBuildHandler(t.row,2)}}},[e._v("设为隐藏\n        ")])]}}])})],1)],1)},staticRenderFns:[]}},JrhV:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.body",value:e.loading,expression:"loading",modifiers:{body:!0}}],staticClass:"table-view-wrapper"},[a("el-table",{staticClass:"table",attrs:{data:e.tableData,stripe:"",border:""}},[e._t("default")],2),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.showPagination,expression:"showPagination"}],staticClass:"pagination",attrs:{background:!0,"current-page":e.pageMeta.page,"page-sizes":[10,20,30,50],"page-size":e.pageMeta.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]}},MvIb:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,".resource-list[data-v-650a1c83]{width:100%;min-height:600px}","",{version:3,sources:["D:/projects/console/client/src/views/node/page-build/list/index.vue"],names:[],mappings:"AACA,gCACE,WAAY,AACZ,gBAAkB,CACnB",file:"index.vue",sourcesContent:["\n.resource-list[data-v-650a1c83] {\n  width: 100%;\n  min-height: 600px;\n}\n"],sourceRoot:""}])},PG49:function(e,t,a){"use strict";var n=a("woOf"),s=a.n(n),r=a("kEHT");t.a={name:"table-view",data:function(){return{loading:!1,tableData:[],total:0}},props:{data:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},formatHandler:{type:Function,default:null},paginationOptions:{type:Object,default:function(){return{pageSizes:[10,20,30,50]}}},loader:Function,pageMeta:{type:Object,default:function(){var e=r.b.get("PAGE_"+this.$route.fullPath+"_index")||{};return s()({pageSize:10,page:1},e)}}},beforeDestroy:function(){r.b.set("PAGE_"+this.pageUrl+"_index",this.pageMeta)},mounted:function(){this.pageUrl=this.$route.fullPath,this.tableData=this.data,this.total=this.tableData.length,this.load(),this.$on("reload",this.reload.bind(this))},methods:{reload:function(e){this.load(e)},load:function(e){var t=this;s()(this.pageMeta,e||{}),this.loader&&(this.loading=!0,this.loader(this.pageMeta).then(function(e){var a=e.getData();if(t.loading=!1,a){var n=a.dataList||a;t.formatHandler&&(n=t.formatHandler(n)),t.tableData=n,a.dataList?(t.total=a.totalItem,t.pageMeta.page=a.page||1):t.total=n.length}else t.$message.error(a.msg)}).catch(function(e){t.$message.warning("加载失败"),t.loading=!1}))},handleSizeChange:function(e){var t={pageSize:e};this.load(t),this.$emit("sizeChange",t)},handleCurrentChange:function(e){var t={page:e};this.load(t),this.$emit("pageChange",t)}}}},WJxV:function(e,t,a){"use strict";var n=a("jWBi");t.a=n.a},jWBi:function(e,t,a){"use strict";var n=a("//Fk"),s=a.n(n),r=(a("1G+u"),{show:1,hide:2});t.a={name:"node-page-build-list",data:function(){return{pagebuildList:[],PAGE_BUILD_STATUS:r}},mounted:function(){var e=this;this.loader().then(this.format.bind(this)).then(function(t){e.pagebuildList=t})},methods:{loader:function(){var e=this,t={nodeId:this.$route.params.nodeId};return this.$services.pagebuild.get({params:t}).then(function(t){var a=[];return t.getData().forEach(function(t){var n=e.$services.resource.get(t.resourceId).then(function(e){return t.resourceDetail=e.getData(),e});a.push(n)}),s.a.all(a).then(function(e){return t.getData()})})},format:function(e){return e.forEach(function(e){e.statusInfo=e.status===r.show?{desc:"默认展示",type:"success"}:{desc:"不展示",type:"info"}}),e},updateStatus:function(){this.pagebuildList.forEach(function(e){e.status=r.hide})},setDefaultPageBuildHandler:function(e,t){t=t||r.show;var a={nodeId:parseInt(this.$route.params.nodeId),status:t};this.changePageBuildShowStatus(e,a)},changePageBuildShowStatus:function(e,t){var a=this;this.$services.pagebuild.put(e.id,t).then(function(n){if(0!==n.data.errcode)throw new Error(n.data.msg);t.status===r.show&&a.updateStatus(),e.status=t.status,a.format(a.pagebuildList),a.$message.success("设置成功")}).catch(this.$error.showErrorMessage)},handlePreview:function(e){this.$router.push({path:"/node/"+this.$route.params.nodeId+"/presentable/detail",query:{presentableId:e.presentableId,ispb:!0}})}}}},"qD+J":function(e,t,a){var n=a("tOcc");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("a96b6e80",n,!0,{})},rQCC:function(e,t,a){"use strict";var n=a("PG49");t.a=n.a},rbfI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("WJxV"),s=a("Eoec"),r=a.n(s),i=a("VU/8")(n.a,r.a,!1,function(e){a("5/8l")},"data-v-650a1c83",null);t.default=i.exports},tOcc:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,".table-view-wrapper .table[data-v-212a221a]{max-height:100%}.table-view-wrapper .pagination[data-v-212a221a]{margin-top:15px;text-align:center}","",{version:3,sources:["D:/projects/console/client/src/components/TableView/index.vue"],names:[],mappings:"AACA,4CACE,eAAiB,CAClB,AACD,iDACE,gBAAiB,AACjB,iBAAmB,CACpB",file:"index.vue",sourcesContent:["\n.table-view-wrapper .table[data-v-212a221a] {\n  max-height: 100%;\n}\n.table-view-wrapper .pagination[data-v-212a221a] {\n  margin-top: 15px;\n  text-align: center;\n}\n"],sourceRoot:""}])}});