import Header from "@/layouts/Header";
import Aside from "@/layouts/Aside";
import Footer from "@/layouts/Footer";
import Category from "@/layouts/Category";

let route = {
  path: '',
  appId: '62d6aee8e2521f0683aba1e6',
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
        default: () => import('@/views/DailyBusinessPositionApp/Page1.vue')
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
    },
    {
      path: '/report_2',
      name: 'report_2',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page2.vue')
      },
      meta: {
        title: 'План-факт',
        description: '',
        viewTitle: '',
        viewDescription: '',
        icon: '',
        visible: true,
        authGroups: ['Все отчёты'],
      },
      children: [],
    },
    {
      path: '/report_3',
      name: 'report_3',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page3.vue')
      },
      meta: {
        title: 'Оборот с долями',
        description: '',
        viewTitle: '',
        viewDescription: '',
        icon: '',
        visible: true,
        authGroups: ['Все отчёты'],
      },
      children: [],
    },
    {
      path: '/report_4',
      name: 'report_4',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page4.vue')
      },
      meta: {
        title: 'Возвраты',
        description: '',
        viewTitle: '',
        viewDescription: '',
        icon: '',
        visible: true,
        authGroups: ['Все отчёты'],
      },
      children: [],
    },
    {
      path: '/report_5',
      name: 'report_5',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page5.vue')
      },
      meta: {
        title: 'Динамика',
        description: '',
        viewTitle: '',
        viewDescription: '',
        icon: '',
        visible: true,
        authGroups: ['Все отчёты'],
      },
      children: [],
    },
    {
      path: '/report_6',
      name: 'report_6',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page6.vue')
      },
      meta: {
        title: 'Лист Анализ продаж LFL',
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
};

export default route;