webpackJsonp([12],{"+vOg":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("ye8Q"),o=n("/mcc"),i=n("D+Dq"),u=n("2peC"),a=n("ZDeK"),c=n("7N2u"),s=n("O2QG"),d=n("6m4j"),l=n("NY5L"),f=n("Pms9"),p=n("P2Md"),h=n("aQz/"),m=n("JhbV"),g=n("A7os"),v=n("UNJn"),b=n("33VF"),S=n("MogU"),y=n("AtMC"),I=n("gx6F"),w=n("BBMc");n.d(t,"UserService",function(){return r.a}),n.d(t,"PolicyService",function(){return o.a}),n.d(t,"ResourceService",function(){return i.a}),n.d(t,"G_ResourcesService",function(){return u.a}),n.d(t,"PresentablesService",function(){return a.a}),n.d(t,"NodesService",function(){return s.a}),n.d(t,"ContractService",function(){return c.a}),n.d(t,"PagebuildService",function(){return d.a}),n.d(t,"OtherService",function(){return l.a}),n.d(t,"orderInfo",function(){return g.a}),n.d(t,"PbContract",function(){return f.a}),n.d(t,"ContractRecords",function(){return p.a}),n.d(t,"Accounts",function(){return h.a}),n.d(t,"Pay",function(){return m.a}),n.d(t,"SigningLicenses",function(){return v.a}),n.d(t,"groupsService",function(){return b.a}),n.d(t,"policyTemplateService",function(){return S.a}),n.d(t,"pbStatics",function(){return y.a}),n.d(t,"authSchemes",function(){return I.a}),n.d(t,"collectionsService",function(){return w.a})},"/mcc":function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/resources/policies")},"0dzb":function(e,t,n){"use strict";t.a={policyTplCreator:function(e){return n.e(4).then(function(){return e(n("JM9C"))}.bind(null,n)).catch(n.oe)},policyTplDetail:function(e){return n.e(4).then(function(){return e(n("iehR"))}.bind(null,n)).catch(n.oe)},policyTplList:function(e){return n.e(4).then(function(){return e(n("8aJ9"))}.bind(null,n)).catch(n.oe)}}},"2O5Q":function(e,t,n){"use strict";var r=n("HSQo"),o=n.n(r),i=n("YaEn");t.a=function(e,n){var r=void 0;i.a.afterEach(function(e){r=e.matched.map(function(e){return e.meta&&e.meta.title||e.name||""}).filter(function(e){return!!e}),document.title=r.join(n.separator)}),o()(e.prototype,{$title:{set:function(){return function(e,t){t?document.title=e.toUpperCase():(r[0]=e.toUpperCase(),document.title=r.join(n.separator))}}}})}},"2mV7":function(e,t,n){"use strict";var r=n("PL7o"),o=n("bREw"),i=n("6qrf"),u=n("BhlZ");t.a={token:r.a,user:o.a,sidebar:i.a,node:u.a}},"2peC":function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/resources/warehouse")},"33VF":function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"b",function(){return u});var r=n("fl6T"),o=n("7B+g");t.a=new o.a("v1/groups");var i=function(e,t){return r.a.post("/v1/groups/operationMembers/"+e,t)},u=function(e){return r.a.get("/v1/groups",e)}},"6m4j":function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/nodes/pagebuilds")},"6qrf":function(e,t,n){"use strict";var r,o,i=n("bOdI"),u=n.n(i),a="toggleSidebar",c="closeSidebar",s="hideSidebar",d="openSidebar",l={state:{showSidebar:!0,openSidebar:!0},mutations:(r={},u()(r,s,function(e){e.showSidebar=!1}),u()(r,a,function(e,t){e.openSidebar=void 0===t?!e.openSidebar:t}),r),actions:(o={},u()(o,s,function(e,t){(0,e.commit)(s,t)}),u()(o,a,function(e,t){(0,e.commit)(a,t)}),u()(o,c,function(e){(0,e.commit)(a,!1)}),u()(o,d,function(e){(0,e.commit)(a,!0)}),o)};t.a=l},"7B+g":function(e,t,n){"use strict";var r=n("pFYg"),o=n.n(r),i=n("woOf"),u=n.n(i),a=n("fl6T");function c(e,t){this.target=e,u()(this,t)}c.prototype={get:function(e,t){var n="/"+this.target;return"object"===(void 0===e?"undefined":o()(e))?t=e:void 0!==e&&(n+="/"+e),a.a.get(n,t)},delete:function(e,t){var n="/"+this.target+"/"+e;return a.a.delete(n,t)},post:function(e){var t="/"+this.target;return a.a.post(t,e)},put:function(e,t){var n="/"+this.target+"/"+e;return a.a.put(n,t)},patch:function(e,t){var n="/"+this.target+"/"+e;return a.a.patch(n,t)}},t.a=c},"7N2u":function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/contracts")},"7kJt":function(e,t,n){"use strict";var r=n("//Fk"),o=n.n(r),i=n("mtWM"),u=n.n(i),a=n("IcnI"),c=n("zL8q"),s=(n.n(c),u.a.create({baseURL:"/api/",timeout:5e3,headers:{"X-Requested-With":"XMLHttpRequest"}}));s.interceptors.request.use(function(e){return a.a.getters.session&&a.a.getters.session.token&&(e.headers.Authorization=a.a.getters.session.token),e},function(e){return o.a.reject(e)}),s.interceptors.response.use(function(t){var e,n=t.data,r="/user/login";if(-1<[28,30].indexOf(n.errcode)&&location.pathname!==r)return r+="?redirect="+encodeURIComponent(location.href),location.replace(r),new o.a(function(e){setTimeout(function(){e(t)},500)});if(200!==t.status||n.ret&&0!==n.ret){switch(t.status){case 401:e="未授权！";break;case 404:e="forbidden-禁止访问";break;case 500:e="服务器内部异常，请稍后再试！";break;default:e=n.msg}return t.errorMsg=e,o.a.reject({response:t})}return t.getData=function(){if(n.hasOwnProperty("errcode")&&0!==n.errcode)throw new Error(n);return n.data||n},t},function(e){return e.response=e.response||{},o.a.reject(e)}),t.a=s},A7os:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/pay/orderInfo")},AmHV:function(e,t,n){"use strict";var r=n("Kkag"),o=n("2O5Q"),i=n("KLmV"),u=n("d9CK"),a=n("D7r4"),c=n("Axgz"),s=n("Ueuj");t.a={install:function(e){Object(r.a)(e),Object(o.a)(e,{property:"title",separator:" » "}),Object(i.a)(e),Object(u.a)(e),Object(a.a)(e),Object(c.a)(e),Object(s.a)(e)}}},AtMC:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/presentables/pbPresentableStatistics")},Axgz:function(e,t,n){"use strict";var r=n("gRE1"),o=n.n(r),i=n("tg7J");t.a=function(e,t){e.filter("humanizeNumber",function(e){return e.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}),e.filter("fmtDate",function(e,t){return e?new Date(e).toLocaleDateString():""});var r=o()(i.a).reduce(function(e,t){return e[t.abbr]=t,e},{});e.filter("humanizeCurrency",function(e,t){if(!e)return"0";var n=(e/r[t||"feth"].unit).toString().split(".",2);return n[0].replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")+(void 0===n[1]?"":"."+n[1])})}},BBMc:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/resources/collections")},BhlZ:function(e,t,n){"use strict";var r,o,i=n("//Fk"),u=n.n(i),a=n("bOdI"),c=n.n(a),s=n("fl6T"),d="checkNode",l="deleteNode",f="changeNode",p={state:{nodeSession:s.c.get("nodeSession")||{nodeId:":nodeId"}},mutations:(r={},c()(r,l,function(e){e.nodeSession={nodeId:":nodeId"},s.c.remove("nodeSession")}),c()(r,f,function(e,t){e.nodeSession=t,s.c.set("nodeSession",t)}),r),actions:(o={},c()(o,d,function(e){e.commit;var n=e.getters;return new u.a(function(e,t){n.nodeSession&&n.nodeSession.nodeDomain?e(n.nodeSession):e(null)})}),c()(o,l,function(e){var t=e.commit;e.getters;return t(l),new u.a(function(e){setTimeout(e,10)})}),c()(o,f,function(e,t){return(0,e.commit)(f,t),new u.a(function(e){setTimeout(e,50)})}),o)};t.a=p},CY7m:function(e,t,n){"use strict";var r=n("7+uW"),o=n("TXmL");r.default.use(o.a),t.a=new o.a({locale:"cn",messages:{}})},"D+Dq":function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/resources")},D7r4:function(e,t,n){"use strict";var r=n("IcnI"),o=n("YaEn");t.a=function(e){o.a.beforeHooks.unshift(function(t,e,n){if(!t.meta.requiresAuth)return n();r.a.dispatch("checkToken").then(function(e){if(e)return n();n({path:"/user/login",query:{redirect:t.fullPath}})})})}},H79z:function(e,t,n){"use strict";n.d(t,"b",function(){return s});var r=n("woOf"),o=n.n(r),i=n("IcnI"),u=n("fl6T"),a=n("fTIY");function c(n,e,r){i.a.dispatch("checkNode").then(function(e){if(e)if(/:nodeId/.test(n.path)){var t=o()({},n);t.path=n.path.replace(":nodeId",e.nodeId),t.fullPath=n.fullPath.replace(":nodeId",e.nodeId),r(t)}else r();else r({path:"/node/login",query:{redirect:n.fullPath}})})}var s={path:":nodeId",component:a.a.container,hidden:!0,meta:{requiresAuth:!0,title:":nodeId节点"},children:[{path:"presentables",beforeEnter:c,meta:{requiresAuth:!0,title:"presentables",type:"node"},component:a.a.presentableList},{path:"contracts",beforeEnter:c,meta:{requiresAuth:!0,title:"资源合同",type:"node"},component:a.a.contractList},{path:"presentable",meta:{requiresAuth:!0,title:"presentable",type:"node"},hidden:!0,component:a.a.container,redirect:"/node/:nodeId/presentable",children:[{path:":presentableId",meta:{requiresAuth:!0,title:"节点资源详情",type:"node"},component:a.a.presentableDetail},{path:":presentableId/scheme_detail",meta:{requiresAuth:!0,title:"资源依赖授权管理",type:"node"},component:a.a.presentableSchemeDetail},{path:"detail",beforeEnter:c,meta:{requiresAuth:!0,title:"节点资源详情",type:"node"},component:a.a.presentableDetail},{path:"create",beforeEnter:c,meta:{requiresAuth:!0,title:"创建presentable",type:"node"},component:a.a.presentableCreator}]},{path:"setting",meta:{requiresAuth:!0,title:"节点设置"},component:a.a.container,children:[{path:"pagebuilds",beforeEnter:c,meta:{requiresAuth:!0,title:"PageBuild管理",type:"node"},component:a.a.pagebuildList}]}]};t.a={path:"node",meta:{requiresAuth:!0,title:"节点管理系统"},component:a.a.container,redirect:"/",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建节点"},component:a.a.nodeCreator},{path:"list",beforeEnter:function(e,t,n){var r=i.a.getters.nodeSession&&i.a.getters.nodeSession.nodeId;if(isNaN(parseInt(r)))n();else{var o="/node/"+r+"/presentables";t.fullPath!==o?n({path:o}):(n(!1),u.b.done())}},meta:{requiresAuth:!0,type:"node",title:"节点列表"},component:a.a.nodeList},{path:"policy_tpl/list",meta:{requiresAuth:!0,title:"策略模板列表",type:"node"},component:a.a.policyTplList},{path:"policy_tpl",hidden:!0,meta:{requiresAuth:!0,type:"node"},component:a.a.container,redirect:"/node/policy_tpl/list",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建策略模板",type:"node"},component:a.a.policyTplCreator},{path:"detail",hidden:!0,meta:{requiresAuth:!0,title:"策略模板详情",type:"node"},component:a.a.policyTplDetail}]},{path:":nodeId",hidden:!0,meta:{requiresAuth:!0,title:"节点详情"},component:a.a.nodeDetail},s]}},IcnI:function(e,t,n){"use strict";var r=n("7+uW"),o=n("NYxO"),i=n("UjVw"),u=n("2mV7");r.default.use(o.a);var a=new o.a.Store({getters:i.a,modules:u.a,strict:!1,plugins:[]});t.a=a},IkmL:function(e,t,n){"use strict";t.a={resourceCreator:function(e){return n.e(0).then(function(){return e(n("guEL"))}.bind(null,n)).catch(n.oe)},resourceEditor:function(e){return n.e(0).then(function(){return e(n("Reur"))}.bind(null,n)).catch(n.oe)},resourceDetail:function(e){return n.e(0).then(function(){return e(n("t2I6"))}.bind(null,n)).catch(n.oe)},resourceList:function(e){return n.e(0).then(function(){return e(n("Jjq5"))}.bind(null,n)).catch(n.oe)},pageBuildPreview:function(e){return n.e(0).then(function(){return e(n("vZM5"))}.bind(null,n)).catch(n.oe)},resourceAuthSchemeEditor:function(e){return n.e(0).then(function(){return e(n("WdQl"))}.bind(null,n)).catch(n.oe)}}},JhbV:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/pay")},KLmV:function(e,t,n){"use strict";var r=n("HSQo"),o=n.n(r),i=n("fZjL"),u=n.n(i),a=n("+vOg");t.a=function(e){var n={};u()(a).forEach(function(e){var t=e.replace(/service/i,"");t=t[0].toLowerCase()+t.substr(1),n[t]=a[e],n[e]=a[e]}),o()(e,{services:{get:function(){return n}}}),o()(e.prototype,{$services:{get:function(){return n}}})}},Kkag:function(e,t,n){"use strict";var r=n("HSQo"),o=n.n(r),i=n("fl6T");t.a=function(e){o()(e,{axios:{get:function(){return i.a}}}),o()(e.prototype,{$axios:{get:function(){return i.a}}})}},M93x:function(e,t,n){"use strict";var r=n("xJD8"),o=n("lNo3"),i=n("XyMi");var u=function(e){n("w+FI")},a=Object(i.a)(r.a,o.a,o.b,!1,u,null,null);t.a=a.exports},MogU:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/policyTemplates")},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),o=n("zL8q"),i=n.n(o),u=n("9JMe"),a=(n.n(u),n("M93x")),c=n("CY7m"),s=n("YaEn"),d=n("IcnI"),l=n("AmHV"),f=n("tvR6"),p=(n.n(f),n("lDBB"));n.n(p);Object(u.sync)(d.a,s.a,{moduleName:"route"}),r.default.use(i.a),r.default.use(l.a),r.default.config.productionTip=!1,new r.default({el:"#app",router:s.a,store:d.a,i18n:c.a,template:"<App/>",components:{App:a.a}})},NY5L:function(e,t,n){"use strict";var r=n("fl6T"),o={login:function(e){return r.a.post("/v1/passport/login",e)},logout:function(e){return r.a.get("/v1/passport/logout",e)},resetPassword:function(e){return r.a.post("/v1/userinfos/resetPassword",e)},register:function(e){return r.a.post("/v1/userinfos/register",e)}};t.a=o},O2QG:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/nodes")},P2Md:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/contracts/contractRecords")},PL7o:function(e,t,n){"use strict";var r=n("bOdI"),o=n.n(r),i=n("//Fk"),u=n.n(i),a=(n("+vOg"),{state:{},mutations:{},actions:o()({},"checkToken",function(e){var n=this,r=(e.commit,e.getters);return new u.a(function(t,e){"localhost"===location.hostname&&!1?t(!1):r.session.user&&r.session.user.userId?t(!0):n.dispatch("getCurrentUser").then(function(e){t(!!e)})})})});t.a=a},Pms9:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/contracts/createPageBuildContracts")},QDOs:function(e,t,n){"use strict";t.a={nodeCreator:function(e){return n.e(1).then(function(){return e(n("YxDi"))}.bind(null,n)).catch(n.oe)},nodeList:function(e){return n.e(1).then(function(){return e(n("9F4x"))}.bind(null,n)).catch(n.oe)},nodeDetail:function(e){return n.e(1).then(function(){return e(n("Q5It"))}.bind(null,n)).catch(n.oe)},nodeLogin:function(e){return n.e(1).then(function(){return e(n("EiYx"))}.bind(null,n)).catch(n.oe)},nodeResourceList:function(e){return n.e(1).then(function(){return e(n("VaEZ"))}.bind(null,n)).catch(n.oe)},nodeResourceDetail:function(e){return n.e(1).then(function(){return e(n("1K/3"))}.bind(null,n)).catch(n.oe)},presentableCreator:function(e){return n.e(2).then(function(){return e(n("lISv"))}.bind(null,n)).catch(n.oe)},presentableDetail:function(e){return n.e(2).then(function(){return e(n("rBJF"))}.bind(null,n)).catch(n.oe)},presentableList:function(e){return n.e(2).then(function(){return e(n("kQ4V"))}.bind(null,n)).catch(n.oe)},pagebuildList:function(e){return n.e(10).then(function(){return e(n("rbfI"))}.bind(null,n)).catch(n.oe)},contractList:function(e){return n.e(8).then(function(){return e(n("qsGF"))}.bind(null,n)).catch(n.oe)},presentableSchemeDetail:function(e){return n.e(2).then(function(){return e(n("kRUJ"))}.bind(null,n)).catch(n.oe)}}},Rlrl:function(e,t,n){"use strict";var r=n("fTIY");t.a={name:"account",path:"/account",meta:{requiresAuth:!0,title:"账户"},component:r.a.layout,redirect:"/account/settings",children:[{path:"settings",meta:{requiresAuth:!0,title:"账户设置"},component:r.a.userSetting}]}},UNJn:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/contracts/signingLicenses")},UVIz:function(e,t){},Ueuj:function(e,t,n){"use strict";var r=n("HSQo"),o=n.n(r),i=n("zL8q");n.n(i);t.a=function(e){var t={showErrorMessage:function(e){var t;e&&(t="string"==typeof e?e:e.response&&e.response.errorMsg?e.response.errorMsg:e.message?e.message:e.msg?e.msg:e.toString(),i.Message.error(t))}};o()(e.prototype,{$error:{get:function(){return t}}})}},UjVw:function(e,t,n){"use strict";var r={session:function(e){return e.user.session},sidebar:function(e){return e.sidebar},nodeSession:function(e){return e.node.nodeSession},serverTime:function(e){return+new Date}};t.a=r},Wo9k:function(e,t,n){"use strict";var r=n("fTIY");t.a={name:"group",path:"group",meta:{requiresAuth:!0,title:"分组管理系统"},component:r.a.container,redirect:"/group/list",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建分组"},component:r.a.groupCreator},{path:"list",meta:{requiresAuth:!0,title:"分组列表"},component:r.a.groupList},{path:"detail/:groupId",hidden:!0,meta:{requiresAuth:!0,title:"分组详情"},component:r.a.groupDetail}]}},YaEn:function(e,t,n){"use strict";var r=n("7+uW"),o=n("/ocq"),i=n("H79z"),u=n("Wo9k"),a=n("Rlrl"),c=n("uPg4"),s=n("jnTS"),d=n("mOXO"),l=n("fTIY");r.default.use(o.a);t.a=new o.a({mode:"history",scrollBehavior:function(e,t,n){if(n)return n;var r={};return e.hash&&(r.selector=e.hash),!1!==e.meta.scrollToTop&&(r.x=0,r.y=0),r},routes:[a.a,s.a,d.a,{path:"/resource/create/preview",meta:{requiresAuth:!0,title:"page build预览"},component:l.a.container,hidden:!0,children:[{path:"/",hidden:!0,meta:{requiresAuth:!1,title:"page build预览"},component:l.a.pageBuildPreview}]},{path:"/",meta:{title:"首页"},component:l.a.layout,children:[c.a,i.a,u.a,{path:"about",hidden:!0,meta:{requiresAuth:!1,title:"关于freelog"},component:l.a.aboutView},{path:"help",hidden:!0,meta:{requiresAuth:!1,title:"帮助中心"},component:l.a.helpView},{path:"/",hidden:!0,meta:{requiresAuth:!1,title:"首页"},component:l.a.mainView}]},{path:"*",meta:{requiresAuth:!1,title:"not found"},component:l.a.layout,children:[{name:"404",path:"",meta:{requiresAuth:!1,title:"404"},component:l.a.error}]}]})},ZDeK:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/presentables")},Zkbe:function(e,t,n){"use strict";t.a={groupCreator:function(e){return n.e(6).then(function(){return e(n("5OCq"))}.bind(null,n)).catch(n.oe)},groupDetail:function(e){return n.e(6).then(function(){return e(n("gYPz"))}.bind(null,n)).catch(n.oe)},groupList:function(e){return n.e(6).then(function(){return e(n("oq6A"))}.bind(null,n)).catch(n.oe)}}},"aQz/":function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/pay/accounts")},bREw:function(e,t,n){"use strict";var r,o,i=n("//Fk"),u=n.n(i),a=n("bOdI"),c=n.n(a),s=n("woOf"),d=n.n(s),l=n("+vOg"),f=n("fl6T"),p=n("kEHT"),h={GET_CURRENT_USER:"getCurrentUser",CHANGE_SESSION:"changeSession",DELETE_SESSION:"deleteSession",USER_LOGIN:"userLogin",USER_LOGOUT:"userLogout",CHECK_USER_SESSION:"checkUserSession"},m={state:{session:p.c.get("user_session")||{user:{},token:null}},mutations:(r={},c()(r,h.CHANGE_SESSION,function(e,t){d()(e.session,t),p.c.set("user_session",e.session)}),c()(r,h.DELETE_SESSION,function(e){e.session={user:{},token:null},p.c.remove("user_session")}),r),actions:(o={},c()(o,h.GET_CURRENT_USER,function(e,t){var n=e.commit;return(t?l.UserService.get(t):f.a.get("/v1/userinfos/current")).then(function(e){return 0===e.data.errcode&&n(h.CHANGE_SESSION,{user:e.data.data}),e.data.data})}),c()(o,h.CHANGE_SESSION,function(e,t){(0,e.commit)(h.CHANGE_SESSION,t)}),c()(o,h.CHECK_USER_SESSION,function(e){e.commit;var t=e.getters,n=t.session||p.c.get("user_session"),r=n&&n.user;if(r&&r.userId)i=r;else{var o=(r=p.a.get("authInfo")).split("."),i=atob(o[1]);try{i=JSON.parse(i)}catch(e){console.error(e),i={}}}return new u.a(function(e){e(!(!t.session||t.session.user.userId!==i.userId))})}),c()(o,h.USER_LOGIN,function(e,t){var n=e.commit;return l.OtherService.login(t).then(function(e){if(0===e.data.ret&&0==e.data.errcode){var t=e.headers.authorization;return n(h.CHANGE_SESSION,{user:e.data.data,token:t}),e.data.data}return u.a.reject(e.data.msg)})}),c()(o,h.USER_LOGOUT,function(e){var t=e.commit;return l.OtherService.logout().then(function(e){if(0!==e.data.ret||0!=e.data.errcode)return u.a.reject(e.data.msg);t(h.DELETE_SESSION),t("deleteNode")})}),o)};t.a=m},d9CK:function(e,t,n){"use strict";var r=n("HSQo"),o=n.n(r),i=n("//Fk"),u=n.n(i),a=n("YaEn"),c=n("fl6T");t.a=function(e){a.a.beforeEach(function(e,t,n){c.b.start(),n()}),a.a.afterEach(function(e){c.b.done()}),c.a.interceptors.request.use(function(e){return c.b.start(),e}),c.a.interceptors.response.use(function(e){return c.b.done(),e},function(e){return c.b.done(),u.a.reject(e)}),o()(e.prototype,{$nprogress:{get:function(){return c.b}}})}},f9QZ:function(e,t,n){"use strict";var r=n("UVIz"),o=(n.n(r),n("Y81h")),i=n.n(o);t.a=i.a},fTIY:function(e,t,n){"use strict";var r=n("Dd8w"),o=n.n(r),i=n("0dzb"),u=n("mhSV"),a=n("IkmL"),c=n("QDOs"),s=n("Zkbe");t.a=o()({layout:function(e){return n.e(5).then(function(){return e(n("4Lha"))}.bind(null,n)).catch(n.oe)},container:function(e){return n.e(5).then(function(){return e(n("pOb8"))}.bind(null,n)).catch(n.oe)},aboutView:function(e){return n.e(7).then(function(){return e(n("oF1k"))}.bind(null,n)).catch(n.oe)},helpView:function(e){return n.e(7).then(function(){return e(n("yNDj"))}.bind(null,n)).catch(n.oe)},error:function(e){return n.e(5).then(function(){return e(n("qZa5"))}.bind(null,n)).catch(n.oe)},mainView:function(e){return n.e(9).then(function(){return e(n("jw7m"))}.bind(null,n)).catch(n.oe)}},u.a,a.a,c.a,s.a,i.a)},fl6T:function(e,t,n){"use strict";var r=n("7kJt"),o=n("kEHT"),i=n("f9QZ");n("q+eO");n.d(t,"a",function(){return r.a}),n.d(t,"c",function(){return o.b}),n.d(t,"b",function(){return i.a})},gx6F:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/resources/authSchemes")},hVPn:function(e,t){},jnTS:function(e,t,n){"use strict";var r=n("fTIY");t.a={path:"/user",meta:{requiresAuth:!1,title:"节点管理系统"},component:r.a.container,redirect:"/user/login",children:[{path:"login",meta:{requiresAuth:!1,title:"用户登录"},component:r.a.userLogin},{path:"reset_pw",hidden:!0,meta:{requiresAuth:!1,title:"重置密码"},component:r.a.userResetPassword},{path:"signup",meta:{requiresAuth:!1,title:"注册新账户"},component:r.a.userSignup}]}},kEHT:function(e,t,n){"use strict";n.d(t,"c",function(){return s}),n.d(t,"a",function(){return d});var r=n("Y4FN"),o=n.n(r),i=n("SGDr"),u=[n("5US4")],a=[n("65I7"),n("wwqQ")],c=[n("uY+Y")],s=i.createStore(c,a),d=i.createStore(u,a);t.b=o.a},lDBB:function(e,t){},lNo3:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o});var r=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"app-wrapper"},[t("transition",{attrs:{name:"fade"}},[t("router-view",{staticClass:"wrapper"})],1)],1)},o=[]},mOXO:function(e,t,n){"use strict";var r=n("fTIY");t.a={name:"resources",path:"/resources",component:r.a.layout,redirect:"/resources/market",meta:{requiresAuth:!0,title:"资源市场"},children:[{path:"market",hidden:!0,meta:{type:"node"},component:r.a.nodeResourceList},{path:"detail",redirect:"/resources/market",hidden:!0,meta:{type:"node"},component:r.a.container,children:[{path:":resourceId",hidden:!0,meta:{title:"资源详情",type:"node"},component:r.a.nodeResourceDetail}]}]}},mhSV:function(e,t,n){"use strict";t.a={userLogin:function(e){return n.e(3).then(function(){return e(n("y0re"))}.bind(null,n)).catch(n.oe)},userResetPassword:function(e){return n.e(3).then(function(){return e(n("JPh7"))}.bind(null,n)).catch(n.oe)},userSetting:function(e){return n.e(3).then(function(){return e(n("lojQ"))}.bind(null,n)).catch(n.oe)},userSignup:function(e){return n.e(3).then(function(){return e(n("1+Pj"))}.bind(null,n)).catch(n.oe)}}},pyoj:function(e,t){},"q+eO":function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(t){try{var e=new URL(t);if(/^.+\.(test)?freelog\.com$/.test(e.hostname))return!0}catch(e){if(/^\/[^\/]+/.test(t))return!0}return!1}},tg7J:function(e,t,n){"use strict";t.a={1:{name:"飞致币",abbr:"feth",value:1,unit:1e3,extBindAddrName:"以太坊",enable:!0},2:{name:"人民币",abbr:"fcny",unit:100,value:2},3:{name:"美元",abbr:"fusd",unit:100,value:3},4:{name:"欧元",abbr:"feur",unit:100,value:4}}},tvR6:function(e,t){},uPg4:function(e,t,n){"use strict";var r=n("fTIY");t.a={name:"resource",path:"resource",meta:{requiresAuth:!0,title:"资源管理系统"},component:r.a.container,redirect:"/resource/list",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建资源",type:"resource"},component:r.a.resourceCreator},{path:"edit/:resourceId",hidden:!0,meta:{requiresAuth:!0,title:"更新资源",type:"resource"},component:r.a.resourceEditor},{path:"list",meta:{requiresAuth:!0,title:"我的资源",type:"resource"},component:r.a.resourceList},{path:"detail",hidden:!0,redirect:"/resource/list"},{path:"detail/:resourceId/auth_schemes",hidden:!0,meta:{requiresAuth:!0,title:"创建资源授权方案",type:"resource"},component:r.a.resourceAuthSchemeEditor},{path:"detail/:resourceId",hidden:!0,meta:{requiresAuth:!0,title:"编辑资源详情",type:"resource"},component:r.a.resourceDetail},{path:"policy_tpl/list",meta:{requiresAuth:!0,title:"资源策略模板列表",type:"resource"},component:r.a.policyTplList},{path:"policy_tpl",hidden:!0,meta:{requiresAuth:!0,type:"resource"},component:r.a.container,redirect:"/resource/policy_tpl/list",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建资源策略模板",type:"resource"},component:r.a.policyTplCreator},{path:"detail",hidden:!0,meta:{requiresAuth:!0,title:"资源策略模板详情",type:"resource"},component:r.a.policyTplDetail}]}]}},"w+FI":function(e,t){},xJD8:function(e,t,n){"use strict";var r=n("pyoj"),o=(n.n(r),n("hVPn"));n.n(o);t.a={name:"app"}},ye8Q:function(e,t,n){"use strict";var r=n("7B+g");t.a=new r.a("v1/userinfos")}},["NHnr"]);