
import Views from '@/views'
import i18n from '../lib/i18n'


export default {
  name: 'release',
  path: 'release',
  meta: {
    requiresAuth: true,
    title: i18n.t('routes.releaseSystem')
  },
  component: Views.container,
  children: [
    {
      path: 'create',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: i18n.t('routes.createRelease'),
        type: 'release',
        theme: 'white'
      },
      component: Views.releaseCreator,
    },
    {
      path: 'detail/:releaseId',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: i18n.t('routes.releaseDetail'),
        type: 'release',
        theme: 'white'
      },
      component: Views.releaseDetail
    },
    {
      path: 'edit/:releaseId',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: i18n.t('routes.releaseEditor'),
        type: 'release',
        theme: 'white'
      },
      component: Views.releaseEditor
    },
    {
      path: 'add',
      hidden: true,
      meta: {
        requiresAuth: true,
        title: i18n.t('routes.releaseAdd'),
        type: 'release',
        theme: 'white'
      },
      component: Views.releaseAdd
    },
    {
      path: 'list',
      meta: {
        requiresAuth: true,
        title: i18n.t('routes.myReleases'),
        type: 'release'
      },
      component: Views.releaseList
    },
  ]
}
