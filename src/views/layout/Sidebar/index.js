import { mapGetters } from 'vuex'

import NavMenu from '../NavMenu/index.vue'
import resourceRoute from '@/router/resource'
import { nodeItemRoute } from '@/router/node'
import resourceMarket from '@/router/resource-market'

import node from '../../../router/node'

function cloneArray(arr) {
  return arr.map((item) => {
    if (typeof item === 'object') {
      return Object.assign({}, item)
    }
    return item
  })
}

function filterHidden(navList) {
  navList = navList.filter((nav) => {
    if (nav.children && nav.children.length) {
      nav.children = filterHidden(nav.children)
    }

    return !nav.hidden
  })

  return navList
}

export default {
  name: 'fl-sidebar',
  components: {
    'fl-nav-menu': NavMenu
  },
  data() {
    return {
      navList: []
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar'
  }),
  methods: {
    changeRouteHandler() {
      let navList
      let homePath
      const routeType = this.$route.meta.type || ''

      switch (routeType) {
        case 'node':
          break
        case 'resource':
          homePath = '/resource'
          navList = cloneArray(resourceRoute.children) // 避免修改源数据
          this.paddingPath(homePath, navList)
          break
        default:
          break
      }
      if (navList) {
        navList = filterHidden(navList)
        this.checkActiveNav(navList)
        this.navList = navList
        this.$store.dispatch('openSidebar')
      } else {
        this.navList = []
        this.$store.dispatch('closeSidebar') // hidesidebar?
      }
    },
    paddingPath(prefix, navs) {
      navs = navs.map((nav) => {
        if (nav.path[0] !== '/') {
          nav.path = [prefix, nav.path].join('/')
        }
        if (nav.children && nav.children.length) {
          nav.children = this.paddingPath(nav.path, cloneArray(nav.children))
        }

        return nav
      })
      return navs
    },
    checkActiveNav(navList) {
      const curPath = this.$route.path
      navList.forEach((nav) => {
        nav.isActive = (curPath === nav.path) || (curPath == nav.redirect)
      })
    }
  },
  watch: {
    $route: 'changeRouteHandler'
  },
  created() {
    this.changeRouteHandler()
  },
  mounted() {
  }
}
