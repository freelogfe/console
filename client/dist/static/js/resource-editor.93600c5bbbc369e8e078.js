(window.webpackJsonp=window.webpackJsonp||[]).push([["resource-editor"],{"AOb/":function(e,t,a){},AVS1:function(e,t,a){"use strict";var s=a("N+CQ");a.n(s).a},GG1c:function(e,t,a){},"M/2d":function(e,t,a){},MiEe:function(e,t,a){},"N+CQ":function(e,t,a){},PYuM:function(e,t,a){"use strict";var s=a("AOb/");a.n(s).a},S6gz:function(e,t,a){"use strict";var s=a("b6KP");a.n(s).a},WnEl:function(e,t,a){"use strict";var s=a("M/2d");a.n(s).a},XVRH:function(e,t,a){"use strict";var s=a("GG1c");a.n(s).a},ZtKZ:function(e,t,a){"use strict";var s=a("bPgk");a.n(s).a},b6KP:function(e,t,a){},bPgk:function(e,t,a){},fIGx:function(e,t,a){"use strict";a.r(t);var s=a("LvDl"),r=a("b4GV"),i=a("7+cO"),o=a("hupZ"),c=a("H2zm"),n={name:"resource-auth-scheme",components:{PolicyEditor:r.a,ResourceSchemeTree:i.a,SearchResource:c.a},props:{updateCallback:{type:Function},detail:{type:Object,default:function(){return{dependencies:[]}}}},data:function(){return{showEditDepResource:!1,dutyStatements:[],bubbleResources:[],editActionType:"",currentEditDepResource:{},curEditDepResourceId:"",curDepResource:{},config:{isPublished:!1}}},mounted:function(){console.log("mounted",this.detail),this.initDependencies(this.detail.scheme)},computed:{},watch:{},methods:{initDependencies:function(e){var t=this,a=e.dependencies,s={};e.dutyStatements.forEach(function(e){s[e.resourceId]=e}),this.dutyStatements=e.dutyStatements,this.detail.isPublished&&Object.assign(this.config,{isPublished:!0}),this.bubbleResources=e.bubbleResources,a.forEach(function(e){e.activeStatus=o.b.UNHANDLE,t.checkResourceActiveStatus(e)}),this.$forceUpdate()},checkResourceActiveStatus:function(e){var t="resourceId",a=Object(s.intersectionBy)(this.dutyStatements,[e],t);if(a.length){var r=Object(s.unionBy)(this.bubbleResources,this.dutyStatements,t);a=Object(s.intersectionBy)(r,e.dependenciesTree,t),(a=Object(s.differenceBy)(a,this.dutyStatements,t)).length?e.activeStatus=o.b.SOME:e.activeStatus=o.b.ALL}else a=Object(s.intersectionBy)(this.detail.scheme.bubbleResources,[e],t),e.activeStatus=a.length?o.b.NONE:o.b.UNHANDLE},addDepResource:function(){this.canEditDep()?(this.showEditDepResource=!0,this.editActionType="add"):this.showEditDepDisabled()},beforeCloseDialogHandler:function(){this.curEditDepResourceId="",this.editActionType="",this.currentEditDepResource={},this.showEditDepResource=!1},canEditDep:function(){return this.detail.enableEditDependency},showEditDepDisabled:function(){this.$confirm("存在已发布授权方案，不可更改依赖资源方案。需删除所有已发布授权方案才可修改依赖资源。",{type:"warning",showCancelButton:!1,confirmButtonText:"知道了"})},resetDepResourceEditor:function(){},changeDepResource:function(e){if(e&&e.resourceId){this.curEditDepResourceId=e.resourceId;var t=this.currentEditDepResource;if(t.resourceId!==e.resourceId){var a={};t.resourceId?(a.oldResource=t,a.newResource=this.formatResource(e)):a=e,this.emitEditEvent(a)}}},emitEditEvent:function(e){this.$emit("change",{action:this.editActionType,data:e}),this.resetDepResourceEditor()},deleteDepResource:function(e){var t=this;this.canEditDep()?(this.editActionType="delete",this.$confirm("确定删除该依赖资源?",{type:"warning"}).then(function(){t.curDepResource&&t.curDepResource.resourceId===e.resourceId&&(t.curDepResource={}),t.hideArrowLine(),t.emitEditEvent({resourceId:e.resourceId})}).catch(function(){})):this.showEditDepDisabled()},updateData:function(){this.updateCallback({id:this.detail.id,data:this._data})},formatResource:function(e){return Object.assign(e,{selectSegment:"",authSchemeId:""}),e},changeResourceScheme:function(e,t,a){this.curDepResource=e;var s=a.currentTarget,r=this.$refs.arrowLine;this.computeLineArrow(r,s.querySelector(".resource-name"))},getParent:function(e,t){if(t){var a=e.parentNode,s="#"===t[0];for(t=t.substr(1);!(s&&a.id===t||!s&&a.className.indexOf(t)>-1)&&a!==document.body;)a=a.parentNode;return a}return e.parentNode},computeLineArrow:function(e,t){this.$nextTick(function(){var a=t.getBoundingClientRect();e.style.top=t.offsetTop+10+"px",e.style.left=t.offsetLeft+a.width+5+"px",e.style.right="6px",e.style.display="block"})},changePolicyHandler:function(e){this.detail.scheme.policies=e},updateDepResourceSchemesHandler:function(e){this.detail.scheme.willDutyStatements=e},updateResourceHandler:function(e){this.curDepResource.activeStatus=e.activeStatus,this.$forceUpdate()},hideArrowLine:function(){this.$refs.arrowLine.style.display="none"},changeModeHandler:function(e){var t=this.$refs.arrowLine;"list"===e?this.hideArrowLine():this.curDepResource.resourceId&&(t.style.display="block")}}},u=(a("S6gz"),a("KHd+")),l=Object(u.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"auth-scheme-section clearfix",class:["scheme-status-"+e.detail.scheme.status]},[a("div",{staticClass:"dep-list-wrap"},[a("div",{staticClass:"dep-list-inner"},[e._m(0),e._v(" "),a("ul",[e._l(e.detail.scheme.dependencies,function(t,s){return a("li",{staticClass:"dep-item",class:["active-status-"+t.activeStatus],on:{click:function(a){e.changeResourceScheme(t,s,a)}}},[a("div",{staticClass:"resource-name",class:{active:t.active}},[a("p",[a("i",{staticClass:"dot"}),e._v(e._s(t.resourceName)+"\n              "),a("i",{staticClass:"del-res-icon el-icon-error",on:{click:function(a){e.deleteDepResource(t)}}})])])])}),e._v(" "),a("li",{staticClass:"dep-item"},[a("el-button",{staticClass:"add-dep-resource-btn",attrs:{type:"text"},on:{click:e.addDepResource}},[a("i",{staticClass:"el-icon-plus"}),e._v("添加引用资源\n          ")])],1)],2),e._v(" "),a("div",{staticClass:"policy-input-wrap"},[e._m(1),e._v(" "),a("policy-editor",{attrs:{showValidate:!1},on:{change:e.changePolicyHandler},model:{value:e.detail.scheme,callback:function(t){e.$set(e.detail,"scheme",t)},expression:"detail.scheme"}})],1),e._v(" "),a("div",{ref:"arrowLine",staticClass:"line-arrow"},[a("i",{staticClass:"circle"})])])]),e._v(" "),a("resource-scheme-tree",{class:["scheme-tree-status-"+e.detail.scheme.status],staticStyle:{"margin-left":"430px"},attrs:{resource:e.curDepResource,contracts:e.dutyStatements,bubbleResources:e.bubbleResources,config:e.config},on:{changeMode:e.changeModeHandler,update:e.updateDepResourceSchemesHandler,updateResource:e.updateResourceHandler}}),e._v(" "),a("el-dialog",{attrs:{visible:e.showEditDepResource,width:"840px","close-on-click-modal":!1,"before-close":e.beforeCloseDialogHandler,top:"10vh",center:""},on:{"update:visible":function(t){e.showEditDepResource=t}}},[a("p",{staticClass:"dialog-title",attrs:{slot:"title"},slot:"title"},[e._v("添加资源")]),e._v(" "),a("search-resource",{staticClass:"add-resource-input",on:{add:e.changeDepResource}})],1)],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("h4",{staticClass:"policy-input-title"},[t("i",{staticClass:"el-icon-question"}),this._v("资源依赖列表")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h4",{staticClass:"policy-input-title"},[t("i",{staticClass:"el-icon-question"}),this._v("授权方案策略")])}],!1,null,"9dd01008",null).exports,d=a("aNms"),h=a("snnE"),p=a("59r6");var m=0,f=1,v={name:"resource-auth-scheme-creator",components:{PolicyEditor:r.a,ResourceAuthScheme:l},data:function(){return{resourceId:this.$route.params.resourceId,tabs:[],resourceDetail:{dependencies:[],resourceId:"",authSchemes:[{}]},curTabName:"",tabsSchemeMap:{},schemeList:[],enableEditDependency:!0,resourceDepChanged:!1,showErrorTip:!1}},mounted:function(){var e=this;this.loadDeps().then(function(t){var a=[e.resourceId];return e.computeDependencyTree(t),t.dependencies.forEach(function(e){a.push(e.resourceId)}),p.a.loadDetail(e.resourceId).then(function(a){e.resourceDetail=Object.assign(a,t)})}).then(function(){console.log("this.resourceDetail",e.resourceDetail),d.a.onloadSchemesForResource(e.resourceId,{policyStatus:2}).then(function(t){t&&t.length?(t.forEach(function(t){t.status===f&&(e.enableEditDependency=!1),e.createTab(t)}),e.setActiveTab(0)):e.createTab()})})},watch:{},computed:{isInitStatus:function(){var e=this.tabsSchemeMap[this.curTabName];return e&&!e.authSchemeId||e&&e.authSchemeId&&e.status===m}},methods:{computeDependencyTree:function(e){var t=this;if(e.dependencies){var a=[];return e.dependencies.forEach(function(e){var s=t.computeDependencyTree(e);a=a.concat(s)}),e.dependenciesTree=Object(s.uniqBy)(e.dependencies.concat(a),"resourceId"),e.dependenciesTree}return[]},initSchemeData:function(e){var t=this.resourceDetail,a={resourceId:t.resourceId,dependencies:Object(s.cloneDeep)(t.dependencies)};return e&&(a=Object.assign(a,e)),this.initAuthScheme(a)},initAuthScheme:function(e){e=e||{};var t={policyText:"",selectedPolicy:{},selectedScheme:{},selected:!1,authSchemeName:"未命名的授权方案",bubbleResources:[],dutyStatements:[],authSchemes:[],dependencies:[]};return Object.keys(t).forEach(function(a){e[a]||(e[a]=t[a])}),e},changeDepsHandler:function(e){switch(e.action){case"add":this.addDependencies(e.data);break;case"delete":this.deleteDependencies(e.data);break;case"modify":this.modifyDependencies(e.data)}this.resourceDepChanged=!0},addDependencies:function(e){var t=this;Object(s.intersectionBy)(this.resourceDetail.dependencies,[e],"resourceId").length?this.$message.warning("重复添加资源"):(this.resourceDetail.dependencies.push(Object(s.cloneDeep)(e)),e.selected=!1,e.authSchemes=[],d.a.onloadSchemesForResource(e.resourceId).then(function(a){a.length&&(e.authSchemes=a),t.schemeList.forEach(function(t){t.dependencies.push(Object(s.cloneDeep)(e))})}))},deleteDependencies:function(e){this.schemeList.forEach(function(t){t.dependencies=t.dependencies.filter(function(t){return t.resourceId!==e.resourceId})})},modifyDependencies:function(e){this.schemeList.forEach(function(t){for(var a=t.dependencies,s=0,r=a.length;s<r;s++){if(a[s].resourceId===e.oldResource.resourceId){d.a.onloadSchemesForResource(e.newResource.resourceId).then(function(){a.splice(s,1,e.newResource)});break}}})},updateData:function(e){},addTab:function(e){var t=e.authSchemeId||Math.random().toString().substr(2);this.tabs.push({title:e.authSchemeName||"未命名授权方案",name:t,content:"resource-auth-scheme",data:{id:t,scheme:e,enableEditDependency:this.enableEditDependency,isPublished:e.status===f}}),e.tabId=t,this.tabsSchemeMap[t]=e,this.curTabName=t},createTab:function(e){var t=this.initSchemeData(e);this.schemeList.push(t),this.addTab(t)},removeTab:function(e){var t=this.tabs,a=this.curTabName;a===e&&t.forEach(function(s,r){if(s.name===e){var i=t[r+1]||t[r-1];i&&(a=i.name)}}),this.curTabName=a,this.tabs=t.filter(function(t){return t.name!==e})},clickTab:function(e){switch(e.name){case"createTab":this.createTab()}},loadDeps:function(){var e=this.resourceId||this.$route.query.resourceId;return this.$axios.get("/v1/resources/getResourceDependencyTree/".concat(e)).then(function(e){return e.getData()})},handleInputConfirm:function(e){e.target.blur()},validate:function(){return Promise.resolve()},createAuthScheme:function(e){return this.$services.authSchemes.post(e).then(function(e){if(0===e.data.errcode)return e.getData();throw new Error(e.data.msg)})},getDutyStateMents:function(e){var t=this,a={dutyStatements:[],bubbleResources:[],unhandles:[]};return Object(h.b)(e,function(e){switch(e.activeStatus){case o.b.NONE:a.bubbleResources.push({resourceId:e.resourceId});break;case o.b.SOME:case o.b.ALL:e.selectedScheme&&a.dutyStatements.push({resourceId:e.resourceId,authSchemeId:e.selectedScheme.authSchemeId,policySegmentId:e.selectedScheme.selectedPolicy.segmentId});break;case o.b.UNHANDLE:a.unhandles.push(e);break;default:a.unhandles.push(e)}var s=e.selectedScheme&&e.selectedScheme.dependencies;if(s&&s.length){var r=t.getDutyStateMents(s);Object.keys(r).forEach(function(e){a[e]=a[e].concat(r[e])})}if(a.unhandles.length)return!0}),a},updateAuthScheme:function(e,t){return this.$services.authSchemes.put(t.authSchemeId,e).then(function(e){if(0===e.data.errcode)return e.getData();throw new Error(e.data.msg)})},updateDependenciesMeta:function(e){if(!this.resourceDepChanged)return Promise.resolve();var t=Object.assign({dependencies:e.dependencies.map(function(e){return e.resourceId})},this.resourceDetail.meta);return this.$services.resource.put(this.resourceDetail.resourceId,{meta:t}).then(function(e){if(0===e.data.errcode)return e;throw new Error(e.data.msg)})},nextHandler:function(e){var t=this;return console.log("schemeData",e),new Promise(function(a,s){t.updateDependenciesMeta(e).then(function(){t.validate().then(function(){var r=t.resolveSchemeData(e);console.log("submit",r),e.authSchemeId?t.updateAuthScheme(r,e).then(function(e){a(e)}).catch(s):t.createAuthScheme(r).then(function(t){e.authSchemeId=t.authSchemeId,Object.assign(e,t),a(t)}).catch(s)}).catch(s)}).catch(s)})},resolveSchemeData:function(e){var t={authSchemeName:e.authSchemeName};if(e.authSchemeId){if(e.policies){var a={};t.policies={},e.policies.forEach(function(e){e.policySegmentId?(t.policies.updatePolicySegments=t.policies.updatePolicySegments||[],t.policies.updatePolicySegments.push({policySegmentId:e.policySegmentId,policyName:e.policyName,status:e.disabled?0:1}),a[e.policySegmentId]=1):e.policyText&&(t.policies.addPolicySegments=t.policies.addPolicySegments||[],t.policies.addPolicySegments.push({policyName:e.policyName,policyText:btoa(e.policyText)}))}),e.policy.forEach(function(e){a[e.segmentId]||(t.policies.removePolicySegments=t.policies.removePolicySegments||[],t.policies.removePolicySegments.push(e.segmentId))})}}else if(t.resourceId=this.resourceDetail.resourceId,e.policies){var r=[];e.policies.forEach(function(e){e.policyText&&e.policyName&&!e.disabled&&r.push({policyName:e.policyName,policyText:btoa(e.policyText)})}),r.length&&(t.policies=r)}if(e.status!==f){var i=this.getDutyStateMents(e.dependencies);if(i.unhandles.length)throw new Error("有资源未选择授权策略");t.dutyStatements=Object(s.uniqBy)(i.dutyStatements,"resourceId"),t.bubbleResources=Object(s.uniqBy)(i.bubbleResources,"resourceId")}return t},backToResourceInfoHandler:function(){this.$router.push("/resource/detail/".concat(this.$route.params.resourceId))},saveSchemeHandler:function(){var e=this,t=this.curTabName,a=this.tabsSchemeMap[t];this.nextHandler(a).then(function(s){if(a.policy=s.policy,0===a.status)return e.createSchemeContracts(a).then(function(s){a.status=o.b.PUBLISHED,e.curTabName="",e.$nextTick(function(){e.curTabName=t}),e.$message.success("创建成功"),e.$router.push("/resource/detail/".concat(a.resourceId))});e.$message.success("操作成功")}).catch(this.$error.showErrorMessage)},validateSchemeOptions:function(e){var t=this,a=!0;return console.log("validateSchemeOptions"),console.log(e),Object(h.b)(e,function(e){if(!1===a||void 0===e.activeStatus||e.activeStatus===o.b.UNHANDLE)return a=!1,!0}),a&&Object(h.b)(e,function(e){if(e.selectedScheme.dependencies&&!1===(a=t.validateSchemeOptions(e.selectedScheme.dependencies)))return!0}),a},createSchemeContracts:function(e){return this.$axios.put("/v1/resources/authSchemes/batchSignContracts/".concat(e.authSchemeId)).then(function(e){return 0===e.data.errcode?e.getData():Promise.reject(e.data.msg)})},tmpSaveAndQuitHandler:function(){var e=this,t=this.tabsSchemeMap[this.curTabName];console.log("scheme",t),this.nextHandler(t).then(function(){e.$message.success("操作成功"),e.$router.push("/resource/detail/".concat(t.resourceId))}).catch(this.$error.showErrorMessage)},deleteAuthSchemeHandler:function(e){var t=this;this.$confirm("确定删除授权方案？",{}).then(function(){var a=e.data.id;t.deleteAuthSchemeById(a).authSchemeId||t.deleteTabById(a),t.setActiveTab()}).catch(function(){})},setActiveTab:function(e){this.tabs.length&&(e=void 0===e?this.tabs.length-1:e,this.curTabName=this.tabs[e].name)},deleteTabById:function(e){for(var t=0,a=this.tabs.length;t<a;t++){if(this.tabs[t].data.id===e){this.tabs.splice(t,1);break}}},deleteAuthSchemeById:function(e){for(var t=0,a=this.schemeList.length;t<a;t++){var s=this.schemeList[t];if(s.tabId===e)return this.schemeList.splice(t,1),s.authSchemeId&&this.deleteScheme(s.authSchemeId),s}},deleteScheme:function(e){var t=this;return this.$services.authSchemes.delete(e).then(function(e){0===e.data.errcode?t.$message.success("成功删除授权方案"):t.$error.showErrorMessage(e)})},inputDownHandler:function(e){var t=e.keyCode;-1!==[37,38,39,40].indexOf(t)&&e.stopPropagation()}}},g=(a("PYuM"),a("XVRH"),Object(u.a)(v,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"auth-scheme-editor-wrap"},[a("div",{staticClass:"top-tab-wrap"},[a("el-tabs",{staticClass:"scheme-nav-tabs",attrs:{type:"card"},on:{"tab-click":e.clickTab},model:{value:e.curTabName,callback:function(t){e.curTabName=t},expression:"curTabName"}},[e._l(e.tabs,function(t,s){return a("el-tab-pane",{key:s,attrs:{name:t.name}},[a("span",{class:["scheme-title-status-"+t.data.scheme.status],attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-circle-check-outline",class:{published:t.data.isPublished}}),e._v(" "),a("el-button",{staticClass:"auth-name",attrs:{type:"text"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.scheme.authSchemeName,expression:"item.data.scheme.authSchemeName"}],staticClass:"input-auth-name",attrs:{type:"text"},domProps:{value:t.data.scheme.authSchemeName},on:{keydown:e.inputDownHandler,keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleInputConfirm(t):null},input:function(a){a.target.composing||e.$set(t.data.scheme,"authSchemeName",a.target.value)}}})]),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:t.data.scheme.authSchemeId,expression:"item.data.scheme.authSchemeId"}],staticClass:"el-icon-delete",on:{click:function(a){e.deleteAuthSchemeHandler(t)}}}),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:!t.data.scheme.authSchemeId,expression:"!item.data.scheme.authSchemeId"}],staticClass:"el-icon-circle-close",on:{click:function(a){e.deleteAuthSchemeHandler(t)}}})],1),e._v(" "),a("lazy-component",[a("resource-auth-scheme",{attrs:{detail:t.data,updateCallback:e.updateData},on:{change:e.changeDepsHandler}})],1)],1)}),e._v(" "),a("el-tab-pane",{attrs:{name:"createTab"}},[a("span",{staticClass:"add-new-scheme-tab-btn",attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-plus"}),e._v("添加新授权方案")])])],2)],1),e._v(" "),a("div",{staticClass:"ft"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showErrorTip,expression:"showErrorTip"}],staticClass:"error-tip-wrap"},[e._v("已发授权方案授权方式不可更改，只可更新授权策略。更新前签约的合同执行原授权策略")]),e._v(" "),a("div",{staticClass:"btm-wrap clearfix"},[a("div",{staticClass:"lf-side"},[a("el-button",{staticClass:"ft-btn gray-btn",attrs:{type:"text"},on:{click:e.backToResourceInfoHandler}},[a("i",{staticClass:"el-icon-back"}),e._v(" 返回资源基础信息\n        ")])],1),e._v(" "),a("div",{staticClass:"rt-side"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isInitStatus,expression:"isInitStatus"}],staticClass:"ft-btn gray-btn",attrs:{type:"text"},on:{click:e.tmpSaveAndQuitHandler}},[e._v("暂存退出\n        ")]),e._v(" "),a("el-button",{staticClass:"ft-btn deep-color-btn",attrs:{type:"primary",round:""},on:{click:e.saveSchemeHandler}},[e._v("\n          "+e._s(e.isInitStatus?"签约并发布":"更新授权方案")+"\n        ")])],1)])])])},[],!1,null,"4e3b7991",null));t.default=g.exports},qqKF:function(e,t,a){"use strict";var s=a("j5TT");a("p77/"),a("AQno"),a("aX69"),a("y8iW"),a("SJVZ"),a("osHv"),a("rt3J"),a("jXCp"),a("jDMi"),a("uhTo"),a("mki7"),a("I96o"),a("uTOq"),a("19Vz");var r={tabSize:4,mode:"text/html",theme:"dracula",lineNumbers:!0,line:!0,keyMap:"sublime",extraKeys:{Ctrl:"autocomplete"},lineWrapping:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],styleSelectedText:!0,highlightSelectionMatches:{showToken:/\w/,annotateScrollbar:!0}},i=(a("+dQi"),a("DzJC"));a("uGbe");var o={name:"resource-meta-info",data:function(){var e=Object.assign({},r);return Object.assign(e,{mode:{name:"javascript",json:!0},viewportMargin:1/0,theme:"idea",lineNumbers:!1,gutters:[]}),{errorMsg:"",editorOptions:e,data:this.value}},components:{codemirror:s.codemirror},props:{value:{type:String,default:function(){return""}}},watch:{value:function(){this.data=this.value}},mounted:function(){},methods:{onCodeChange:function(e){var t=this;this.data=e,this.validator?this.validator():this.validator=i(function(){t.validateJSON()},2e3),this.$emit("input",this.data)},validateJSON:function(){try{this.data&&JSON.parse(this.data),this.clearErrorMsg()}catch(e){this.errorMsg="JSON格式有误！"+e}this.$emit("validate",this.errorMsg)},clearErrorMsg:function(){this.errorMsg=""}}},c=(a("ZtKZ"),a("KHd+")),n=Object(c.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"meta-editor-wrap"},[t("el-alert",{directives:[{name:"show",rawName:"v-show",value:this.errorMsg,expression:"errorMsg"}],staticStyle:{"margin-bottom":"15px"},attrs:{title:this.errorMsg,"show-icon":"",type:"error"},on:{close:this.clearErrorMsg}}),this._v(" "),t("codemirror",{ref:"codeMirror",attrs:{code:this.data,options:this.editorOptions,placeholder:"描述资源meta信息的JSON数据"},on:{input:this.onCodeChange}})],1)},[],!1,null,null,null).exports,u=a("11pw"),l=a("mL9P"),d=(a("gJae"),a("p1OT"),a("FOEY"),a("lT11")),h={name:"fl-rich-editor",data:function(){var e=this;return{editor:null,showImgUploader:!1,content:"",editorOption:{placeholder:this.placeholder,modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],["link","image","video"]],handlers:{image:function(){e.showImgUploader=!0,e.uploadImgState={cursorIndex:this.quill.selection.savedRange.index}}}}}}}},props:{value:{type:String,default:function(){return""}},config:{type:Object,default:function(){return{}}},placeholder:String},watch:{},mounted:function(){var e=this;if(this.createEditor(),this.$route.params.resourceId)var t=this.$watch("value",function(){e.value&&(e.content=e.value),t()})},components:{"quill-rich-editor":d.quillEditor},methods:{uploadImageSuccessHandler:function(e,t){this.$emit("load",{file:t,data:e}),this.resetImgUploaderState()},uploadImageErrorHandler:function(){this.resetImgUploaderState()},resetImgUploaderState:function(){this.$refs.imgUploader.clearFiles(),this.uploadImgState.cursorIndex="",this.showImgUploader=!1},createEditor:function(){this.editor=this.$refs.richEditor.quill,this.setHtml(this.value||"")},getHtml:function(){return this.content},setHtml:function(e){this.editor?this.editor.setContents(e):console.warn("还未创建编辑器")},insertImg:function(e){this.editor.insertEmbed(this.uploadImgState.cursorIndex,"image",e)},getEditor:function(){return this.editor},onEditorBlur:function(e){},onEditorFocus:function(e){},onEditorReady:function(e){},onEditorChange:function(e){e.quill;var t=e.html;e.text;this.$emit("input",t)}}},p=(a("WnEl"),"creator"),m="editor",f={name:"base-resource-creator",components:{ResourceMetaInfo:n,RichEditor:Object(c.a)(h,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rich-editor-wrapper"},[a("quill-rich-editor",{ref:"richEditor",staticClass:"rich-text-editor",attrs:{options:e.editorOption},on:{blur:function(t){e.onEditorBlur(t)},focus:function(t){e.onEditorFocus(t)},ready:function(t){e.onEditorReady(t)},change:function(t){e.onEditorChange(t)}},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}}),e._v(" "),a("el-dialog",{attrs:{visible:e.showImgUploader,center:"",width:"500px"},on:{"update:visible":function(t){e.showImgUploader=t}}},[a("el-upload",{ref:"imgUploader",staticClass:"rich-editor-upload-img",attrs:{drag:"",action:"/api/v1/resources/upoladPreviewImage","on-success":e.uploadImageSuccessHandler,"on-error":e.uploadImageErrorHandler,"auto-upload":!0}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("点击上传或将图片拖到此处")])])],1)],1)},[],!1,null,null,null).exports},data:function(){var e=this;return{ResourceTypes:l.RESOURCE_TYPES,rules:{resourceName:[{required:!0,message:"请输入资源名称",trigger:"blur"}],widgetName:[{validator:function(t,a,s){e.formData.resourceType!==l.RESOURCE_TYPES.widget||/^freelog-[a-z0-9._-]{3,15}-[a-z0-9._-]{2,14}[a-z0-9]$/.test(a)?s():s(new Error("例如freelog-namespace-widgetname，namespace和widgetname至少3个字符"))},trigger:"blur"}],resourceType:[{required:!0,message:"请选择资源类型",trigger:"blur"},{validator:function(e,t,a){var s=/^[a-z]{1}[0-9a-z_]{2,19}[0-9a-z]{1}$/;s.test(t)?a():a(new Error("命名格式有误，需满足"+s.toString()))},trigger:"blur"}]},options:Object.keys(l.RESOURCE_TYPES).map(function(e){return{label:e,value:l.RESOURCE_TYPES[e]}}),loading:!1,formData:{resourceType:u.c.get("CREATE_RESOURCE_TYPE")||l.RESOURCE_TYPES.widget,resourceName:"",widgetName:"",description:"",previewImage:""},uploader:{headers:{method:"POST"}},valid:!1,meta:"{}",editMode:p,editorConfig:{},percentage:0,currentUploader:"",uploaderStates:{resource:{percentage:0,isUploaded:!1,isUploading:!1,name:""},thumbnail:{percentage:0,isUploaded:!1,isUploading:!1,name:""}}}},props:{data:{type:Object,default:function(){return{}}}},computed:{showCreatorInputItem:function(){return this.editMode===p},shouldShowResourceUploader:function(){return!(this.uploaderStates.resource.isUploading||this.uploaderStates.resource.isUploaded)},shouldShowThumbnailInput:function(){return this.formData.resourceType===l.RESOURCE_TYPES.pageBuild}},watch:{data:function(){if(this.data.resourceId&&(this.editMode=m,Object.assign(this.formData,this.data),this.formData.widgetName=this.data.systemMeta.widgetName||"",this.data.previewImages.length&&(this.formData.previewImage=this.data.previewImages[0]),this.data.meta))try{this.meta=JSON.stringify(this.data.meta)}catch(e){this.meta="{}"}}},mounted:function(){this.resourceTypeChange(this.formData.resourceType)},methods:{resourceTypeChange:function(e){u.c.set("CREATE_RESOURCE_TYPE",e)},checkMetaValid:function(e){this.valid=e},errorHandler:function(e){var t,a;if(this.loading=!1,void 0!==e.errcode)a={error:e.msg};else{switch(e.status){case 400:t="不支持的文件类型";break;case 401:t="权限未经验证";break;default:t=e.message}a={error:t}}this.$emit("uploadEnd",a),this.$refs.resourceUploader.fileList=[]},successHandler:function(e,t){this.loading=!1,0!==e.ret||0!==e.errcode?(this.$refs.resourceUploader.clearFiles(),this.uploaderStates.resource.isUploading=!1,this.uploaderStates.resource.percentage=0,this.$message.error(e.msg),this.$emit("uploadEnd",{error:e.msg})):(this.uploaderStates.resource.sha1=e.data.sha1,this.uploaderStates.resource.isUploaded=!0,this.uploaderStates.resource.percentage=100,this.autoSetFormData(t),this.$emit("uploadEnd",e.data))},autoSetFormData:function(e){var t=e.name.split(".");t.length>1&&t.pop(),t=t.join("."),this.formData.widgetName||this.formData.resourceType!==l.RESOURCE_TYPES.widget||(this.formData.widgetName=t),this.formData.resourceName||(this.formData.resourceName=t)},fileChangeHandler:function(e,t){this.fileLimitValidator(e,t)},imageUploadSuccessHandler:function(e){this.uploaderStates.thumbnail.isUploading=!1,0===e.errcode?(this.formData.previewImage=e.data,this.uploaderStates.thumbnail.isUploaded=!0,this.uploaderStates.thumbnail.percentage=100):(this.uploaderStates.thumbnail.percentage=0,this.$error.showErrorMessage(e.msg))},previewImageChangeHandler:function(e,t){this.fileLimitValidator(e,t)},validateImageHandler:function(e){return/\.(jpg|png|gif|tiff|webp)$/.test(e.name)?(this.resetUploaderState(this.uploaderStates.thumbnail),!0):(this.$message.error("不支持的图片类型"),!1)},clearUploaderHandler:function(e){var t,a=this.uploaderStates[e];(t="resource"===e?this.$refs.resourceUploader:this.$refs.thumbnailUploader).clearFiles(),t.abort(a.file),Object.assign(a,{sha1:"",name:"",isUploading:!1,isUploaded:!1,percentage:0})},beforeUploadHandler:function(e){this.resetUploaderState(this.uploaderStates.resource,e)},resetUploaderState:function(e,t){Object.assign(e,{file:t,name:t&&t.name||"",isUploading:!0,isUploaded:!1,percentage:0})},imgUploadSuccessHandler:function(e){var t=e.data,a=this.$refs.editor;0===t.errcode?a.insertImg(t.data):this.$message.error(t.msg)},validate:function(){var e=this;return new Promise(function(t,a){var s=e.uploaderStates.resource;e.$refs.createForm.validate(function(r,i){if(r){var o;if(e.editMode===p)if(s.sha1?s.isUploaded||(o="资源文件正在上传中，等上传完再点击创建"):o="未上传资源文件",o)return a(o);try{JSON.parse(e.meta)}catch(i){return console.error(i),a("meta格式有误: ".concat(i))}t()}else{var c=Object.keys(i).map(function(e){return i[e].message});a(c.join("，"))}})})},fileLimitValidator:function(e,t){return!(t.length>1)||(t.shift(),!1)},packUploadData:function(){var e,t=this.uploaderStates.resource,a={},s=this.formData,r=["resourceName"];try{e=JSON.parse(this.meta)}catch(t){e={}}this.formData.widgetName&&(e.widgetName=this.formData.widgetName),this.editMode===p?(r=r.concat(["resourceType"]),a.sha1=t.sha1,s.previewImage&&(a.previewImage=s.previewImage)):s.previewImage&&(a.previewImages=[s.previewImage]),a.meta=e;var i=this.$refs.editor.getHtml();return i&&(a.description=i),r.forEach(function(e){s[e]&&(a[e]=s[e])}),console.log(a),a},isChanged:function(){return!0},nextHandler:function(){var e=this;return new Promise(function(t,a){e.validate().then(function(){var s=e.packUploadData();e.data.resourceId?e.isChanged()?e.updateResource(s).then(t).catch(a):t():e.createResource(s).then(t).catch(a)}).catch(a)})},createResource:function(e){var t=this;return new Promise(function(a,s){t.$refs.resourceUploader.uploadFiles.length>0?t.$services.resource.post(e).then(function(e){0!==e.data.ret||0!==e.data.errcode?s(e.data.msg):a(e.data.data)}):s("无上传文件")})},updateResource:function(e){return this.$services.resource.put(this.data.resourceId,e).then(function(e){return 0!==e.data.ret||0!==e.data.errcode?Promise.reject(e):e.getData()})},uploadProgressHandler:function(e,t,a){var s,r=this.uploaderStates;r.resource.name===t.name?s=r.resource:r.thumbnail.name===t.name&&(s=r.thumbnail),s&&(s.percentage=parseInt(t.percentage.toFixed()))}}},v=(a("tDFS"),a("AVS1"),Object(c.a)(f,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"base-resource-wrap",class:["resource-edit-mode-"+e.editMode]},[a("el-form",{ref:"createForm",attrs:{model:e.formData,"label-width":"0",rules:e.rules}},[a("el-form-item",[a("div",{staticClass:"uploader-wrapper"},[e.shouldShowThumbnailInput?a("div",{staticClass:"resource-thumbnail-input"},[a("el-upload",{directives:[{name:"show",rawName:"v-show",value:!e.uploaderStates.thumbnail.isUploading,expression:"!uploaderStates.thumbnail.isUploading"}],ref:"thumbnailUploader",staticClass:"resource-thumbnail-uploader",attrs:{drag:"",action:"/api/v1/resources/upoladPreviewImage",data:e.uploader.data,headers:e.uploader.headers,"on-error":e.errorHandler,"on-change":e.previewImageChangeHandler,"on-success":e.imageUploadSuccessHandler,"before-upload":e.validateImageHandler,"on-progress":e.uploadProgressHandler,"show-file-list":!1,"auto-upload":!0}},[e.formData.previewImage?a("img",{staticStyle:{height:"100%"},attrs:{src:e.formData.previewImage,alt:""}}):[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("div",{staticClass:"resource-file-tip"},[a("p",[e._v("资源预览图")]),e._v(" "),a("p",{staticClass:"resource-file-sub-tip"},[e._v("800X600")])])]],2),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.uploaderStates.thumbnail.isUploading,expression:"uploaderStates.thumbnail.isUploading"}],staticClass:"thumbnail-upload-state"},[a("p",[e._v("资源预览图")]),e._v(" "),a("div",[a("i",{staticClass:"el-icon-circle-close",on:{click:function(t){e.clearUploaderHandler("thumbnail")}}}),e._v(" "),a("el-progress",{staticStyle:{"margin-right":"20px"},attrs:{"stroke-width":10,percentage:e.uploaderStates.thumbnail.percentage,color:"#333333"}})],1)])],1):e._e(),e._v(" "),a("div",{staticClass:"resource-file-input"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!0===e.shouldShowResourceUploader,expression:"shouldShowResourceUploader === true"}],staticClass:"resource-file-uploader-wrap"},[e.showCreatorInputItem?a("el-upload",{ref:"resourceUploader",staticClass:"resource-file-uploader",attrs:{drag:"",action:"/api/v1/resources/uploadResourceFile",multiple:!1,data:{resourceType:e.formData.resourceType},headers:e.uploader.headers,"before-upload":e.beforeUploadHandler,"on-error":e.errorHandler,"on-change":e.fileChangeHandler,"on-success":e.successHandler,"show-file-list":!1,"on-progress":e.uploadProgressHandler,"auto-upload":!0}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("div",{staticClass:"resource-file-tip"},[a("p",[e._v("资源文件")]),e._v(" "),a("p",{staticClass:"resource-file-sub-tip"},[e._v("拖拽或点击上传，最大不超过50M")])])]):e._e(),e._v(" "),e.uploaderStates.resource.isUploading?e._e():a("el-select",{staticClass:"resource-type",attrs:{disabled:!e.showCreatorInputItem,"allow-create":"",filterable:"",placeholder:"资源类型"},on:{change:e.resourceTypeChange},model:{value:e.formData.resourceType,callback:function(t){e.$set(e.formData,"resourceType",t)},expression:"formData.resourceType"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!1===e.shouldShowResourceUploader,expression:"shouldShowResourceUploader === false"}],staticClass:"resource-upload-state"},[a("div",{staticClass:"resource-type-desc"},[e._v("资源文件类型："+e._s(e.formData.resourceType))]),e._v(" "),a("div",[a("i",{staticClass:"el-icon-circle-close",on:{click:function(t){e.clearUploaderHandler("resource")}}}),e._v(" "),e.shouldShowResourceUploader?e._e():a("el-progress",{staticClass:"resource-file-progress",attrs:{"stroke-width":10,percentage:e.uploaderStates.resource.percentage,color:"#333333"}})],1)])])])]),e._v(" "),a("el-form-item",{attrs:{prop:"resourceName"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.resourceName,expression:"formData.resourceName"}],staticClass:"input-item resource-name",attrs:{type:"text",placeholder:"资源标题"},domProps:{value:e.formData.resourceName},on:{input:function(t){t.target.composing||e.$set(e.formData,"resourceName",t.target.value)}}})]),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.formData.resourceType===e.ResourceTypes.widget,expression:"formData.resourceType === ResourceTypes.widget"}],attrs:{prop:"widgetName"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.widgetName,expression:"formData.widgetName"}],staticClass:"input-item widget-name",attrs:{type:"text",disabled:!e.showCreatorInputItem,placeholder:"widget名称"},domProps:{value:e.formData.widgetName},on:{input:function(t){t.target.composing||e.$set(e.formData,"widgetName",t.target.value)}}})]),e._v(" "),a("el-form-item",{attrs:{prop:"description"}},[a("rich-editor",{ref:"editor",staticClass:"res-desc-editor",attrs:{width:"100%",config:e.editorConfig,placeholder:"请输入资源描述"},on:{load:e.imgUploadSuccessHandler},model:{value:e.formData.description,callback:function(t){e.$set(e.formData,"description",t)},expression:"formData.description"}})],1),e._v(" "),a("el-form-item",[a("h4",{staticClass:"step-title"},[e._v("资源meta信息")]),e._v(" "),a("resource-meta-info",{attrs:{placeholder:"资源meta信息"},on:{validate:e.checkMetaValid},model:{value:e.meta,callback:function(t){e.meta=t},expression:"meta"}})],1)],1)],1)},[],!1,null,"0043d261",null));t.a=v.exports},sICs:function(e,t,a){"use strict";var s=a("yW3A");a.n(s).a},tDFS:function(e,t,a){"use strict";var s=a("MiEe");a.n(s).a},xPN4:function(e,t,a){"use strict";a.r(t);var s=a("L2JU"),r=a("qqKF"),i=a("59r6"),o={name:"resource-detail-edit",data:function(){return{isDev:!1,resourceDetail:{}}},computed:Object(s.b)({session:"session"}),components:{ResourceInputs:r.a},mounted:function(){var e=this,t=this.$route.params;t.resourceId&&i.a.loadDetail(t.resourceId).then(function(t){e.resourceDetail=t}).catch(this.$error.showErrorMessage)},methods:{executeNext:function(e){var t=this;this.$refs.inputArea.nextHandler?this.$refs.inputArea.nextHandler().then(function(a){a&&Object.assign(t.resourceDetail,a),e(a)}).catch(this.$error.showErrorMessage):e(detail)},updateResourceHandler:function(){var e=this;this.executeNext(function(t){console.log(t),e.$message.success("更新成功")})}}},c=(a("sICs"),a("KHd+")),n=Object(c.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"resource-detail-edit-wrap"},[e.isDev?a("div",{staticClass:"update-res-file"},[a("el-upload",{ref:"upload",staticClass:"upload-container",attrs:{drag:"",data:{meta:"{}"},"with-credentials":!0,action:"/api/v1/resources/updateResourceContext/"+e.resourceDetail.resourceId,"auto-upload":!0}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("上传文件不超过50MB，只能上传一个文件")])])],1):e._e(),e._v(" "),a("resource-inputs",{ref:"inputArea",attrs:{data:e.resourceDetail}}),e._v(" "),a("div",{staticClass:"ft clearfix"},[a("div",{staticClass:"rt-side"},[a("el-button",{staticClass:"ft-btn deep-color-btn",attrs:{type:"text"},on:{click:e.updateResourceHandler}},[e._v("更新资源")])],1)])],1)},[],!1,null,"24992348",null);t.default=n.exports},yW3A:function(e,t,a){}}]);