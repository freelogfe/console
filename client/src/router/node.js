import Container from 'views/layout/container.vue'

import {
  nodeCreator,
  nodeUpdator,
  nodeList,
  nodeDetail,
  nodeResourceList,
  resourceDetail,
  nodePolicyManagement,
  nodeMyResourceList,
  nodeContracts,
  createPresentable,
  presentableDetail
} from '@/views'
import presentables from "../services/presentables";



export const nodeItemRoute = {
  path: ':nodeId',
    component: Container,
    hidden: true,
    meta: {
    requiresAuth: true,
      title: ':nodeId节点' //:key 可动态通过route.params上的k-v进行替换
  },
  redirect: '/node/:nodeId/presentables',
  children: [
    {
      path: 'resources',
      meta: {
        requiresAuth: true,
        title: '资源市场'
      },
      component: nodeResourceList
    },
    {
      path: 'presentables',
      meta: {
        requiresAuth: true,
        title: 'presentables'
      },
      component: nodeMyResourceList
    },
    {
      path: 'contracts',
      meta: {
        requiresAuth: true,
        title: 'contracts'
      },
      component: nodeContracts
    },
    {
      path: 'presentable',
      meta: {
        requiresAuth: true,
        title: 'contracts'
      },
      component: Container,
      children: [
        {
          path: 'detail',
          meta: {
            requiresAuth: true,
            title: 'presentable详情'
          },
          component: presentableDetail
        },
        {
          path: 'create',
          meta: {
            requiresAuth: true,
            title: '创建presentable'
          },
          component: createPresentable
        }
      ]
    },
    {
      path: 'policyManagement',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点策略操作'
      },
      component: Container,
      children: [
        {
          path: 'sign',
          meta: {
            requiresAuth: true,
            title: '创建合同'
          },
          component: nodePolicyManagement
        },
      ]
    }
  ]
};

export default {
  path: 'node',
  meta: {
    requiresAuth: true,
    title: '节点管理系统'
  },
  component: Container,
  redirect: '/node/list',
  children: [
    {
      path: 'create',
      meta: {
        requiresAuth: true,
        title: '创建节点'
      },
      component: nodeCreator
    },
    {
      path: 'edit',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '更新节点'
      },
      component: nodeUpdator
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: '节点列表'
      },
      component: nodeList
    },
    {
      path: 'resources/detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '资源详情'
      },
      component: resourceDetail
    },
    nodeItemRoute,
    {
      path: 'detail',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: '节点详情'
      },
      component: nodeDetail
    },
  ]
}
