webpackJsonp([10],{"+vOg":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("ye8Q"),u=n("/mcc"),o=n("D+Dq"),i=n("2peC"),a=n("ZDeK"),c=n("7N2u"),s=n("O2QG"),f=n("6m4j"),d=n("NY5L"),l=n("Pms9"),h=n("P2Md"),p=n("aQz/"),m=n("JhbV"),v=n("A7os");n("LT3D");n.d(e,"UserService",function(){return r.a}),n.d(e,"PolicyService",function(){return u.a}),n.d(e,"ResourceService",function(){return o.a}),n.d(e,"G_ResourcesService",function(){return i.a}),n.d(e,"PresentablesService",function(){return a.a}),n.d(e,"NodesService",function(){return s.a}),n.d(e,"ContractService",function(){return c.a}),n.d(e,"PagebuildService",function(){return f.a}),n.d(e,"OtherService",function(){return d.a}),n.d(e,"orderInfo",function(){return v.a}),n.d(e,"PbContract",function(){return l.a}),n.d(e,"ContractRecords",function(){return h.a}),n.d(e,"Accounts",function(){return p.a}),n.d(e,"Pay",function(){return m.a})},"/mcc":function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/resources/policies")},"2O5Q":function(t,e,n){"use strict";var r=n("HSQo"),u=n.n(r),o=n("YaEn");e.a=function(t,e){var n=void 0;o.a.afterEach(function(t){n=t.matched.map(function(t){return t.meta&&t.meta.title||t.name||""}).filter(function(t){return!!t}),document.title=n.join(e.separator)}),u()(t.prototype,{$title:{set:function(){return function(t,r){r?document.title=t.toUpperCase():(n[0]=t.toUpperCase(),document.title=n.join(e.separator))}}}})}},"2mV7":function(t,e,n){"use strict";var r=n("PL7o"),u=n("bREw"),o=n("6qrf"),i=n("BhlZ");e.a={token:r.a,user:u.a,sidebar:o.a,node:i.a}},"2peC":function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/resources/warehouse")},"6m4j":function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/nodes/pagebuilds")},"6qrf":function(t,e,n){"use strict";var r,u,o=n("bOdI"),i=n.n(o),a={TOGGLE_SIDEBAR:"toggleSidebar",CLOSE_SIDEBAR:"closeSidebar",HIDE_SIDEBAR:"hideSidebar",OPEN_SIDEBAR:"openSidebar"},c={state:{showSidebar:!0,openSidebar:!0},mutations:(r={},i()(r,a.HIDE_SIDEBAR,function(t){t.showSidebar=!1}),i()(r,a.TOGGLE_SIDEBAR,function(t,e){t.openSidebar=void 0===e?!t.openSidebar:e}),r),actions:(u={},i()(u,a.HIDE_SIDEBAR,function(t,e){(0,t.commit)(a.HIDE_SIDEBAR,e)}),i()(u,a.TOGGLE_SIDEBAR,function(t,e){(0,t.commit)(a.TOGGLE_SIDEBAR,e)}),i()(u,a.CLOSE_SIDEBAR,function(t){(0,t.commit)(a.TOGGLE_SIDEBAR,!1)}),i()(u,a.OPEN_SIDEBAR,function(t){(0,t.commit)(a.TOGGLE_SIDEBAR,!0)}),u)};e.a=c},"7B+g":function(t,e,n){"use strict";function r(t,e){this.target=t,a()(this,e)}var u=n("pFYg"),o=n.n(u),i=n("woOf"),a=n.n(i),c=n("fl6T");r.prototype={get:function(t,e){var n="/"+this.target;return"object"===(void 0===t?"undefined":o()(t))?e=t:void 0!==t&&(n+="/"+t),c.a.get(n,e)},delete:function(t,e){var n="/"+this.target+"/"+t;return c.a.delete(n,e)},post:function(t){var e="/"+this.target;return c.a.post(e,t)},put:function(t,e){var n="/"+this.target+"/"+t;return c.a.put(n,e)},patch:function(t,e){var n="/"+this.target+"/"+t;return c.a.patch(n,e)}},e.a=r},"7N2u":function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/contracts")},"7kJt":function(t,e,n){"use strict";var r=n("//Fk"),u=n.n(r),o=n("mtWM"),i=n.n(o),a=n("IcnI"),c=n("zL8q"),s=(n.n(c),i.a.create({baseURL:"//console.freelog.com/api/",timeout:5e3,headers:{"X-Requested-With":"XMLHttpRequest"}}));s.interceptors.request.use(function(t){return a.a.getters.session.user&&(t.headers.Authorization=a.a.getters.session.token),t},function(t){return u.a.reject(t)}),s.interceptors.response.use(function(t){var e,n=t.data;if([28,30].indexOf(n.errcode)>-1&&"/user/login"!==location.pathname)return location.replace("/user/login"),new u.a(function(e){setTimeout(function(){e(t)},500)});if(200!==t.status||n.ret&&0!==n.ret){switch(t.status){case 401:e="未授权！";break;case 404:e="forbidden-禁止访问";break;case 500:e="服务器内部异常，请稍后再试！";break;default:e=n.msg}return t.errorMsg=e,u.a.reject({response:t})}return t.getData=function(){return n.data||n},t},function(t){return t.response=t.response||{},u.a.reject(t)}),e.a=s},"9Cx6":function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"content"}},[e("router-view")],1)},staticRenderFns:[]}},A7os:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/pay/orderInfo")},AmHV:function(t,e,n){"use strict";var r=n("Kkag"),u=n("2O5Q"),o=n("KLmV"),i=n("d9CK"),a=n("D7r4"),c=n("Axgz"),s=n("Ueuj");e.a={install:function(t){Object(r.a)(t),Object(u.a)(t,{property:"title",separator:" » "}),Object(o.a)(t),Object(i.a)(t),Object(a.a)(t),Object(c.a)(t),Object(s.a)(t)}}},Axgz:function(t,e,n){"use strict";var r=n("gRE1"),u=n.n(r),o=n("tg7J");e.a=function(t,e){var n=u()(o.a).reduce(function(t,e){return t[e.abbr]=e,t},{});t.filter("fmtDate",function(t,e){if(!t)return"";return new Date(t).toLocaleDateString()}),t.filter("humanizeCurrency",function(t,e){if(!t)return"0";var r=(t/n[e||"feth"].unit).toString().split(".",2);return r[0].replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")+(void 0===r[1]?"":"."+r[1])})}},BhlZ:function(t,e,n){"use strict";var r,u,o=n("//Fk"),i=n.n(o),a=n("bOdI"),c=n.n(a),s=n("fl6T"),f={CHECK_NODE:"checkNode",DELETE_NODE:"deleteNode",CHANGE_NODE:"changeNode"},d={state:{nodeSession:s.c.get("nodeSession")||{nodeId:":nodeId"}},mutations:(r={},c()(r,f.DELETE_NODE,function(t){t.nodeSession={nodeId:":nodeId"},s.c.remove("nodeSession")}),c()(r,f.CHANGE_NODE,function(t,e){t.nodeSession=e,s.c.set("nodeSession",e)}),r),actions:(u={},c()(u,f.CHECK_NODE,function(t){t.commit;var e=t.getters;return new i.a(function(t,n){t(e.nodeSession&&e.nodeSession.nodeDomain?e.nodeSession:null)})}),c()(u,f.DELETE_NODE,function(t){var e=t.commit;t.getters;return e(f.DELETE_NODE),new i.a(function(t){setTimeout(t,10)})}),c()(u,f.CHANGE_NODE,function(t,e){return(0,t.commit)(f.CHANGE_NODE,e),new i.a(function(t){setTimeout(t,50)})}),u)};e.a=d},CY7m:function(t,e,n){"use strict";var r=n("7+uW"),u=n("TXmL");r.default.use(u.a),e.a=new u.a({locale:"cn",messages:{}})},"D+Dq":function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/resources")},D7r4:function(t,e,n){"use strict";var r=n("IcnI"),u=n("YaEn");e.a=function(t){u.a.beforeHooks.unshift(function(t,e,n){if(!t.meta.requiresAuth)return n();r.a.dispatch("checkToken").then(function(e){if(e)return n();n({path:"/user/login",query:{redirect:t.fullPath}})})})}},GU7O:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app-wrapper"},[e("transition",{attrs:{name:"fade"}},[e("router-view",{staticClass:"wrapper"})],1)],1)},staticRenderFns:[]}},H79z:function(t,e,n){"use strict";function r(t,e,n){a.a.dispatch("checkNode").then(function(e){if(e)if(/:nodeId/.test(t.path)){var r=o()({},t);r.path=t.path.replace(":nodeId",e.nodeId),r.fullPath=t.fullPath.replace(":nodeId",e.nodeId),n(r)}else n();else n({path:"/node/login",query:{redirect:t.fullPath}})})}n.d(e,"b",function(){return s});var u=n("woOf"),o=n.n(u),i=n("pOb8"),a=n("IcnI"),c=n("fTIY"),s={path:":nodeId",component:i.a,hidden:!0,meta:{requiresAuth:!0,title:":nodeId节点"},redirect:"/node/:nodeId/presentables",children:[{path:"presentables",beforeEnter:r,meta:{requiresAuth:!0,title:"presentables"},component:c.q},{path:"contracts",beforeEnter:r,meta:{requiresAuth:!0,title:"资源合同"},component:c.c},{path:"presentable",meta:{requiresAuth:!0,title:"presentable"},hidden:!0,component:i.a,redirect:"/node/:nodeId/presentables",children:[{path:"detail",beforeEnter:r,meta:{requiresAuth:!0,title:"presentable详情"},component:c.p},{path:"create",beforeEnter:r,meta:{requiresAuth:!0,title:"创建presentable"},component:c.d}]},{path:"setting",meta:{requiresAuth:!0,title:"setting"},component:i.a,children:[{path:"pagebuilds",beforeEnter:r,meta:{requiresAuth:!0,title:"PageBuild管理"},component:c.o}]}]};e.a={path:"node",meta:{requiresAuth:!0,title:"节点管理系统"},component:i.a,redirect:"/node/list",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建节点"},component:c.i},{path:"edit",hidden:!0,meta:{requiresAuth:!0,title:"更新节点"},component:c.m},{path:"list",meta:{requiresAuth:!0,title:"节点列表"},component:c.k},{path:"detail/:nodeId",hidden:!0,meta:{requiresAuth:!0,title:"节点详情"},component:c.j},{path:"login",hidden:!0,meta:{requiresAuth:!0,title:"节点登录"},component:c.a},s]}},IcnI:function(t,e,n){"use strict";var r=n("7+uW"),u=n("NYxO"),o=n("UjVw"),i=n("2mV7");r.default.use(u.a);var a=new u.a.Store({getters:o.a,modules:i.a,strict:!1,plugins:[]});e.a=a},JhbV:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/pay")},KLmV:function(t,e,n){"use strict";var r=n("HSQo"),u=n.n(r),o=n("fZjL"),i=n.n(o),a=n("+vOg");e.a=function(t){var e={};i()(a).forEach(function(t){var n=t.replace(/service/i,"");n=n[0].toLowerCase()+n.substr(1),e[n]=a[t],e[t]=a[t]}),u()(t,{services:{get:function(){return e}}}),u()(t.prototype,{$services:{get:function(){return e}}})}},Kkag:function(t,e,n){"use strict";var r=n("HSQo"),u=n.n(r),o=n("fl6T");e.a=function(t){u()(t,{axios:{get:function(){return o.a}}}),u()(t.prototype,{$axios:{get:function(){return o.a}}})}},LT3D:function(t,e,n){"use strict";new(n("7B+g").a)("v1/contracts/signingLicenses")},M93x:function(t,e,n){"use strict";var r=n("xJD8"),u=n("GU7O"),o=n.n(u),i=function(t){n("shvy")},a=n("VU/8")(r.a,o.a,!1,i,null,null);e.a=a.exports},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),u=n("zL8q"),o=n.n(u),i=n("9JMe"),a=(n.n(i),n("M93x")),c=n("CY7m"),s=n("YaEn"),f=n("IcnI"),d=n("AmHV"),l=n("tvR6"),h=(n.n(l),n("lDBB"));n.n(h);Object(i.sync)(f.a,s.a,{moduleName:"route"}),r.default.use(o.a),r.default.use(d.a),r.default.config.productionTip=!1,new r.default({el:"#app",router:s.a,store:f.a,i18n:c.a,template:"<App/>",components:{App:a.a}})},NY5L:function(t,e,n){"use strict";var r=n("fl6T"),u={login:function(t){return r.a.post("/v1/passport/login",t)},logout:function(t){return r.a.get("/v1/passport/logout",t)},resetPassword:function(t){return r.a.post("/v1/userinfos/resetPassword",t)},register:function(t){return r.a.post("/v1/userinfos/register",t)}};e.a=u},O2QG:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/nodes")},P2Md:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/contracts/contractRecords")},PL7o:function(t,e,n){"use strict";var r=n("bOdI"),u=n.n(r),o=n("//Fk"),i=n.n(o),a=(n("+vOg"),{state:{},mutations:{},actions:u()({},"checkToken",function(t){var e=this,n=(t.commit,t.getters);return new i.a(function(t,r){n.session.user&&n.session.user.userId?t(!0):e.dispatch("getCurrentUser").then(function(e){t(!!e)})})})});e.a=a},Pms9:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/contracts/createPageBuildContracts")},QGCz:function(t,e,n){"use strict";var r=n("fZjL"),u=n.n(r);e.a={name:"fl-container",beforeRouteUpdate:function(t,e,n){var r=t.fullPath,o=this.$route.params,i=!1;u()(o).forEach(function(t){var e=":"+t;r.indexOf(e)>-1&&(i=!0,r=r.replace(e,o[t]))}),i?n({path:r}):n()}}},Rlrl:function(t,e,n){"use strict";var r=n("fTIY");e.a={name:"account",path:"/account",meta:{requiresAuth:!0,title:"账户"},component:r.g,redirect:"/account/settings",children:[{path:"settings",meta:{requiresAuth:!0,title:"账户设置"},component:r.y}]}},UVIz:function(t,e){},Ueuj:function(t,e,n){"use strict";var r=n("HSQo"),u=n.n(r),o=n("zL8q");n.n(o);e.a=function(t){var e={showErrorMessage:function(t){if(t){var e="string"==typeof t?t:t.response&&t.response.errorMsg||t.message||t;o.Message.error(e)}}};u()(t.prototype,{$error:{get:function(){return e}}})}},UjVw:function(t,e,n){"use strict";var r={session:function(t){return t.user.session},sidebar:function(t){return t.sidebar},nodeSession:function(t){return t.node.nodeSession},serverTime:function(t){return+new Date}};e.a=r},YaEn:function(t,e,n){"use strict";var r=n("7+uW"),u=n("/ocq"),o=n("H79z"),i=n("Rlrl"),a=n("uPg4"),c=n("jnTS"),s=n("mOXO"),f=n("pOb8"),d=n("fTIY");r.default.use(u.a);e.a=new u.a({mode:"history",scrollBehavior:function(t,e,n){if(n)return n;var r={};return t.hash&&(r.selector=t.hash),!1!==t.meta.scrollToTop&&(r.x=0,r.y=0),r},routes:[i.a,c.a,s.a,{path:"/resource/create/preview",meta:{requiresAuth:!0,title:"page build预览"},component:f.a,hidden:!0,children:[{path:"/",hidden:!0,meta:{requiresAuth:!1,title:"page build预览"},component:d.n}]},{path:"/",meta:{requiresAuth:!0,title:"首页"},component:d.g,children:[a.a,o.a,{path:"about",hidden:!0,meta:{requiresAuth:!1,title:"关于freelog"},component:d.b},{path:"help",hidden:!0,meta:{requiresAuth:!1,title:"帮助中心"},component:d.f}]},{path:"*",meta:{requiresAuth:!1,title:"not found"},component:d.g,children:[{name:"404",path:"",meta:{requiresAuth:!1,title:"404"},component:d.e}]}]})},ZDeK:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/presentables")},ZRus:function(t,e){},"aQz/":function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/pay/accounts")},bREw:function(t,e,n){"use strict";var r,u=n("//Fk"),o=n.n(u),i=n("bOdI"),a=n.n(i),c=n("woOf"),s=n.n(c),f=n("+vOg"),d=n("fl6T"),l=n("YaEn"),h={GET_CURRENT_USER:"getCurrentUser",CHANGE_SESSION:"changeSession",USER_LOGIN:"userLogin",USER_LOGOUT:"userLogout"},p={state:{session:d.c.get("user_session")||{user:{},token:null}},mutations:a()({},h.CHANGE_SESSION,function(t,e){s()(t.session,e),d.c.set("user_session",t.session)}),actions:(r={},a()(r,h.GET_CURRENT_USER,function(t,e){var n=t.commit;return(e?f.UserService.get(e):d.a.get("/v1/userinfos/current")).then(function(t){return 0===t.data.errcode&&n(h.CHANGE_SESSION,{user:t.data.data}),t.data.data})}),a()(r,h.CHANGE_SESSION,function(t,e){(0,t.commit)(h.CHANGE_SESSION,e)}),a()(r,h.USER_LOGIN,function(t,e){var n=t.commit;return f.OtherService.login(e).then(function(t){if(0===t.data.ret&&0==t.data.errcode){var e=t.headers.authorization;return n(h.CHANGE_SESSION,{user:t.data.data,token:e}),t.data.data}return o.a.reject(t.data.msg)})}),a()(r,h.USER_LOGOUT,function(t,e){var n=t.commit;return e=e||"/",f.OtherService.logout().then(function(t){if(0!==t.data.ret||0!=t.data.errcode)return o.a.reject(t.data.msg);n("deleteNode"),setTimeout(function(){l.a.replace({path:"/user/login",query:{redirect:e}})},20)})}),r)};e.a=p},d9CK:function(t,e,n){"use strict";var r=n("HSQo"),u=n.n(r),o=n("//Fk"),i=n.n(o),a=n("YaEn"),c=n("fl6T");e.a=function(t){a.a.beforeEach(function(t,e,n){c.b.start(),n()}),a.a.afterEach(function(t){c.b.done()}),c.a.interceptors.request.use(function(t){return c.b.start(),t}),c.a.interceptors.response.use(function(t){return c.b.done(),t},function(t){return c.b.done(),i.a.reject(t)}),u()(t.prototype,{$nprogress:{get:function(){return c.b}}})}},f9QZ:function(t,e,n){"use strict";var r=n("UVIz"),u=(n.n(r),n("Y81h")),o=n.n(u);e.a=o.a},fTIY:function(t,e,n){"use strict";n.d(e,"g",function(){return r}),n.d(e,"e",function(){return u}),n.d(e,"h",function(){return o}),n.d(e,"x",function(){return i}),n.d(e,"r",function(){return a}),n.d(e,"y",function(){return c}),n.d(e,"s",function(){return s}),n.d(e,"w",function(){return f}),n.d(e,"v",function(){return d}),n.d(e,"t",function(){return l}),n.d(e,"c",function(){return h}),n.d(e,"u",function(){return p}),n.d(e,"i",function(){return m}),n.d(e,"m",function(){return v}),n.d(e,"k",function(){return g}),n.d(e,"j",function(){return b}),n.d(e,"l",function(){return E}),n.d(e,"d",function(){return S}),n.d(e,"p",function(){return O}),n.d(e,"o",function(){return I}),n.d(e,"b",function(){return A}),n.d(e,"f",function(){return D}),n.d(e,"n",function(){return q}),n.d(e,"q",function(){return w}),n.d(e,"a",function(){return _});var r=function(t){return n.e(4).then(function(){return t(n("4Lha"))}.bind(null,n)).catch(n.oe)},u=function(t){return n.e(4).then(function(){return t(n("qZa5"))}.bind(null,n)).catch(n.oe)},o=function(t){return n.e(2).then(function(){return t(n("y0re"))}.bind(null,n)).catch(n.oe)},i=function(t){return n.e(2).then(function(){return t(n("1+Pj"))}.bind(null,n)).catch(n.oe)},a=function(t){return n.e(2).then(function(){return t(n("JPh7"))}.bind(null,n)).catch(n.oe)},c=function(t){return n.e(2).then(function(){return t(n("lojQ"))}.bind(null,n)).catch(n.oe)},s=function(t){return n.e(1).then(function(){return t(n("guEL"))}.bind(null,n)).catch(n.oe)},f=function(t){return n.e(6).then(function(){return t(n("jw7m"))}.bind(null,n)).catch(n.oe)},d=function(t){return n.e(1).then(function(){return t(n("Jjq5"))}.bind(null,n)).catch(n.oe)},l=function(t){return n.e(0).then(function(){return t(n("1K/3"))}.bind(null,n)).catch(n.oe)},h=function(t){return n.e(7).then(function(){return t(n("qsGF"))}.bind(null,n)).catch(n.oe)},p=function(t){return n.e(1).then(function(){return t(n("Reur"))}.bind(null,n)).catch(n.oe)},m=function(t){return n.e(0).then(function(){return t(n("YxDi"))}.bind(null,n)).catch(n.oe)},v=function(t){return n.e(0).then(function(){return t(n("YxDi"))}.bind(null,n)).catch(n.oe)},g=function(t){return n.e(0).then(function(){return t(n("HC2d"))}.bind(null,n)).catch(n.oe)},b=function(t){return n.e(0).then(function(){return t(n("Q5It"))}.bind(null,n)).catch(n.oe)},E=function(t){return n.e(0).then(function(){return t(n("VaEZ"))}.bind(null,n)).catch(n.oe)},S=function(t){return n.e(3).then(function(){return t(n("lISv"))}.bind(null,n)).catch(n.oe)},O=function(t){return n.e(3).then(function(){return t(n("rBJF"))}.bind(null,n)).catch(n.oe)},I=function(t){return n.e(8).then(function(){return t(n("rbfI"))}.bind(null,n)).catch(n.oe)},A=function(t){return n.e(5).then(function(){return t(n("oF1k"))}.bind(null,n)).catch(n.oe)},D=function(t){return n.e(5).then(function(){return t(n("yNDj"))}.bind(null,n)).catch(n.oe)},q=function(t){return n.e(1).then(function(){return t(n("vZM5"))}.bind(null,n)).catch(n.oe)},w=function(t){return n.e(3).then(function(){return t(n("kQ4V"))}.bind(null,n)).catch(n.oe)},_=function(t){return n.e(0).then(function(){return t(n("EiYx"))}.bind(null,n)).catch(n.oe)}},fl6T:function(t,e,n){"use strict";var r=n("7kJt"),u=n("kEHT"),o=n("f9QZ");n.d(e,"a",function(){return r.a}),n.d(e,"c",function(){return u.a}),n.d(e,"b",function(){return o.a})},hVPn:function(t,e){},jnTS:function(t,e,n){"use strict";var r=n("pOb8"),u=n("fTIY");e.a={path:"/user",meta:{requiresAuth:!1,title:"节点管理系统"},component:r.a,redirect:"/user/login",children:[{path:"login",meta:{requiresAuth:!1,title:"用户登录"},component:u.h},{path:"reset_pw",hidden:!0,meta:{requiresAuth:!1,title:"重置密码"},component:u.r},{path:"signup",meta:{requiresAuth:!1,title:"注册新账户"},component:u.x}]}},kEHT:function(t,e,n){"use strict";var r=n("Y4FN"),u=n.n(r);e.a=u.a},lDBB:function(t,e){},mOXO:function(t,e,n){"use strict";var r=n("pOb8"),u=n("fTIY");e.a={name:"resources",path:"/resources",component:u.g,redirect:"/resources/market",meta:{requiresAuth:!0,title:"资源市场"},children:[{path:"market",hidden:!0,meta:{},component:u.l},{path:"detail",redirect:"/resources/market",hidden:!0,meta:{},component:r.a,children:[{path:":resourceId",hidden:!0,meta:{title:"资源详情"},component:u.t}]}]}},pOb8:function(t,e,n){"use strict";var r=n("QGCz"),u=n("9Cx6"),o=n.n(u),i=function(t){n("ZRus")},a=n("VU/8")(r.a,o.a,!1,i,null,null);e.a=a.exports},pyoj:function(t,e){},shvy:function(t,e){},tg7J:function(t,e,n){"use strict";e.a={1:{name:"飞致币",abbr:"feth",value:1,unit:1e3,extBindAddrName:"以太坊",enable:!0},2:{name:"人民币",abbr:"fcny",unit:100,value:2},3:{name:"美元",abbr:"fusd",unit:100,value:3},4:{name:"欧元",abbr:"feur",unit:100,value:4}}},tvR6:function(t,e){},uPg4:function(t,e,n){"use strict";var r=n("pOb8"),u=n("fTIY");e.a={name:"resource",path:"resource",meta:{requiresAuth:!0,title:"资源管理系统"},component:r.a,redirect:"/resource/list",children:[{path:"create",hidden:!0,meta:{requiresAuth:!0,title:"创建资源"},component:u.s},{path:"update",hidden:!0,meta:{requiresAuth:!0,title:"更新资源"},component:u.w},{path:"list",meta:{requiresAuth:!0,title:"我的资源"},component:u.v},{path:"detail",hidden:!0,meta:{requiresAuth:!0,title:"编辑资源详情"},component:u.u}]}},xJD8:function(t,e,n){"use strict";var r=n("pyoj"),u=(n.n(r),n("hVPn"));n.n(u);e.a={name:"app"}},ye8Q:function(t,e,n){"use strict";var r=n("7B+g");e.a=new r.a("v1/userinfos")}},["NHnr"]);