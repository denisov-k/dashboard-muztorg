import Vue from 'vue'
import Router from 'vue-router'
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Aside from './layouts/Aside';
import Category from './layouts/Category';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/Home.vue')
      },
      props: {
        header: (a) => {
          return {
            showNavigationMenu: true
          }
        }
      },
      meta: {
        title: 'Аналитика',
        description: '',
        viewTitle: '',
        viewDescription: '',
        icon: '',
        visible: false,
        authGroups: [],
      },
      children: [],
    },
    {
      path: '',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: Category
      },
      meta: {
        title: 'Daily Business Position',
        visible: true,
        authGroups: ['Все отчёты'],
      },
      children: [
        {
          path: '/report_1',
          name: 'report_1',
          components: {
            header: Header,
            aside: Aside,
            footer: Footer,
            default: () => import('@/views/DataManagementApp/Page1.vue')
          },
          meta: {
            title: 'Эффективность и услуги',
            description: '',
            viewTitle: '',
            viewDescription: '',
            icon: '',
            visible: true,
            authGroups: ['Все отчёты'],
          },
          children: [],
        }
      ]
    }
  ]
})

export default router;