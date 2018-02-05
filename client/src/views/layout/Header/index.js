import {mapGetters} from 'vuex'


export default {
  name: 'fl-header',

  data() {
    return {
      navRoutes: [],
      isSideBarOpen: true
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar',
    session: 'session',
    nodeSession: 'nodeSession'
  }),

  created() {
    this.listenWindowVisibility()
    this.resolveRouter();
  },

  methods: {
    handleCommand(cmd) {
      this[cmd] && this[cmd]()
    },
    listenWindowVisibility() {
      var self = this
      var hidden = 'hidden';
      var doc = document

      if (hidden in doc)
        doc.addEventListener('visibilitychange', onchange);
      else if ((hidden = 'mozHidden') in doc)
        doc.addEventListener('mozvisibilitychange', onchange);
      else if ((hidden = 'webkitHidden') in doc)
        doc.addEventListener('webkitvisibilitychange', onchange);
      else if ((hidden = 'msHidden') in doc)
        doc.addEventListener('msvisibilitychange', onchange);
      else
        window.onpageshow = window.onpagehide
          = window.onfocus = window.onblur = onchange;

      function onchange(evt) {
        var v = 'visible';
        var h = 'hidden';
        var evtMap = {
          focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
        };
        var type

        evt = evt || window.event;
        if (evt.type in evtMap) {
          type = evtMap[evt.type];
        } else {
          type = this[hidden] ? 'hidden' : 'visible';
        }

        if (type === 'visible') {
          self.syncUserSession()
        }
      }
    },
    syncUserSession() {
      this.$store.dispatch('checkUserSession')
        .then((valid) => {
          if (!valid) {
            this.$store.dispatch('deleteNode')
            this.$store.dispatch('getCurrentUser').then(() => {
              location.reload()
            })
          }
        })
    },
    logoutNodeHandler() {
      this.$store.dispatch('deleteNode')
    },
    switchNodeHandler() {
      this.$store.dispatch('deleteNode')
      this.$router.push({path: '/node/login'})
    },
    toggleSidebarHandler() {
      this.$store.dispatch('toggleSidebar')
    },
    resolveRouter() {
      var routes = this.$router.options.routes;

      for (var i = 0; i < routes.length; i++) {
        let route = routes[i];
        if (route.path === '/') {
          this.navRoutes = route.children.filter(r => !r.hidden);
          break;
        }
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.dispatch('userLogout')
        .then(() => {
          var redirect = this.$route.fullPath || '/'
          setTimeout(() => {
            this.$router.replace({path: '/user/login', query: {redirect: redirect}})
          }, 20)
        })
        .catch(this.$error.showErrorMessage)
    }
  }
}
