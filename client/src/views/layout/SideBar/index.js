import {mapGetters} from 'vuex'

import NavMenu from '../NavMenu/index.vue'
import nodeRoute from '@/router/node'
import resourceRoute from '@/router/resource'
import {nodeItemRoute} from '@/router/node'
import node from "../../../router/node";


export default {
  name: 'fl-sidebar',
  components: {
    'fl-nav-menu': NavMenu
  },
  data() {
    return {
      navList: [],
      routeType: ''
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar'
  }),
  methods: {
    changeRouteHandler() {
      var fullPath = this.$route.fullPath;
      var paths = fullPath.split('/').filter((v) => {
        return !!v;
      });
      var navList;
      var homePath;

      if (this.$route.params.nodeId) {
        homePath = `/node/${this.$route.params.nodeId}`;
        navList = nodeItemRoute.children
      } else {
        this.routeType = paths[0] || '';
        homePath =  '/' + this.routeType
        switch (this.routeType) {
          case 'node':
            navList = nodeRoute.children;
            break;
          case 'resource':
            navList = resourceRoute.children;
            break;
          default:
            break;
        }
      }

      if (navList) {
        navList = JSON.parse(JSON.stringify(navList)) //避免修改源数据
        this.navList = navList.map((nav)=>{
          nav.path = [homePath, nav.path].join('/')
          return nav
        });
        this.$store.dispatch('openSidebar')
      } else {
        this.navList = [];
        this.$store.dispatch('closeSidebar') //hidesidebar?
      }
    }
  },
  watch: {
    '$route': 'changeRouteHandler'
  },
  created() {
    this.changeRouteHandler();
  },
  mounted() {

  }
}
