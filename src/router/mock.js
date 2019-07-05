/**
 * mock 池
 */
import Views from '@/views'
import i18n from '../lib/i18n'

export default {
    name: 'mock',
    path: 'mock',
    meta: {
        requiresAuth: true,
        title: i18n.t('routes.resourceSystem'),
        hideFooter: true,
    },
    component: Views.container,
    redirect: '/mock/display',
    children: [
        {
            path: 'display',
            meta: {
                requiresAuth: true,
                // title: i18n.t('routes.resourcePolicyTplList'),
                // title: i18n.t('routes.resourcePolicyTplList'),
                title: '模拟资源池',
                type: 'resource',
                hideFooter: true,
            },
            component: Views.mockDisplay
        },
        // {
        //     path: 're-edit',
        //     meta: {
        //         requiresAuth: true,
        //         // title: i18n.t('routes.resourcePolicyTplList'),
        //         title: i18n.t('routes.resourcePolicyTplList'),
        //         type: 'resource',
        //         hideFooter: true,
        //         theme: 'gray'
        //     },
        //     component: Views.mockReEdit
        // },
        {
            path: 'create',
            hidden: true,
            meta: {
                requiresAuth: true,
                // title: i18n.t('routes.createResource'),
                title: '创建模拟资源',
                type: 'resource',
                theme: 'gray',
                hideFooter: true,
            },
            component: Views.mockCreator,
        },
        {
            path: 'create/:mockResourceId',
            hidden: true,
            meta: {
                requiresAuth: true,
                // title: i18n.t('routes.createResource'),
                title: '模拟资源管理',
                type: 'resource',
                theme: 'gray',
                hideFooter: true,
            },
            component: Views.mockCreator,
        },
        {
            path: 'editor',
            hidden: true,
            meta: {
                requiresAuth: true,
                // title: i18n.t('routes.createResource'),
                title: '创建模拟资源',
                theme: 'gray',
                hideFooter: true,
            },
            component: Views.mockEditor,
        },
        // {
        //     path: 'edit/:resourceId',
        //     hidden: true,
        //     meta: {
        //         requiresAuth: true,
        //         title: i18n.t('routes.updateResource'),
        //         type: 'resource',
        //         theme: 'gray',
        //         // hideSidebar: true
        //     },
        //     component: Views.mockEditor,
        // },
        // {
        //     path: 'list',
        //     meta: {
        //         requiresAuth: true,
        //         title: i18n.t('routes.myResources'),
        //         type: 'resource'
        //     },
        //     component: Views.mockList
        // },
        // {
        //     path: 'detail',
        //     hidden: true,
        //     redirect: '/resource/list',
        // },
        // {
        //     path: 'detail/:resourceId',
        //     hidden: true,
        //     meta: {
        //         requiresAuth: true,
        //         title: i18n.t('routes.resourceDetail'),
        //         type: 'resource',
        //         theme: 'gray'
        //     },
        //     component: Views.mockDetail
        // },
        // {
        //     path: 'policy_tpl',
        //     hidden: true,
        //     meta: {
        //         requiresAuth: true,
        //         type: 'resource'
        //     },
        //     component: Views.container,
        //     redirect: '/resource/policy_tpl/list',
        //     children: [
        //         {
        //             path: 'create',
        //             hidden: true,
        //             meta: {
        //                 requiresAuth: true,
        //                 title: i18n.t('routes.createResourcePolicyTpl'),
        //                 type: 'resource'
        //             },
        //             component: Views.policyTplCreator
        //         },
        //         {
        //             path: 'detail',
        //             hidden: true,
        //             meta: {
        //                 requiresAuth: true,
        //                 title: i18n.t('routes.resourcePolicyTplDetail'),
        //                 type: 'resource'
        //             },
        //             component: Views.policyTplDetail
        //         }
        //     ]
        // }
    ]
}
