const nodeCreator = resolve => require.ensure([], () => resolve(require('./create/index.vue')), 'node')
const nodeList = resolve => require.ensure([], () => resolve(require('./list/index.vue')), 'node')
const nodeDetail = resolve => require.ensure([], () => resolve(require('./detail/index.vue')), 'node')
const presentableList = resolve => require.ensure([], () => resolve(require('./presentables-V4/index.vue')), 'presentable')

const nodePreview = resolve => require.ensure([], () => resolve(require('./preview/index.vue')), 'node')

const presentableDetail = resolve => require.ensure([], () => resolve(require('./presentable-V4/detail/index.vue')), 'presentable')

export default {
  nodeCreator,
  nodeList,
  nodeDetail,
  presentableList,
  nodePreview,
  presentableDetail
}
