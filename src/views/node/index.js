const nodeCreator = resolve => require.ensure([], () => resolve(require('./create/index.vue')), 'node')
const nodeList = resolve => require.ensure([], () => resolve(require('./list/index.vue')), 'node')
const nodeDetail = resolve => require.ensure([], () => resolve(require('./detail/index.vue')), 'node')
const nodeResourceList = resolve => require.ensure([], () => resolve(require('./resource/list/index.vue')), 'node')
const nodeResourceDetail = resolve => require.ensure([], () => resolve(require('./resource/detail/index.vue')), 'node')

const presentableSchemeDetail = resolve => require.ensure([], () => resolve(require('./presentable/auth-scheme/index.vue')), 'presentable')
const presentableList = resolve => require.ensure([], () => resolve(require('./presentables/index.vue')), 'presentable')

const contractList = resolve => require.ensure([], () => resolve(require('./contract/list/index.vue')), 'contract')


export default {
  nodeCreator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  nodeResourceDetail,
  presentableList,
  contractList,
  presentableSchemeDetail
}