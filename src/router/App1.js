import Header from "@/layouts/Header";
import Aside from "@/layouts/Aside";
import Footer from "@/layouts/Footer";
import Category from "@/layouts/Category";

let route = {
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
      path: '/dbp/report_1',
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
      path: '/dbp/plan_fact_kpi',
      name: 'plan_fact_kpi',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/PlanFactKPI.vue')
      },
      meta: {
        title: 'План-факт KPI',
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
      path: '/dbp/plan_fact',
      name: 'plan_fact',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/PlanFact.vue')
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
      path: '/dbp/report_3',
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
      path: '/dbp/report_4',
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
      path: '/dbp/report_5',
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
      path: '/dbp/report_6',
      name: 'report_6',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page6.vue')
      },
      meta: {
        title: 'Анализ продаж LFL',
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
      path: '/dbp/report_7',
      name: 'report_7',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page7.vue')
      },
      meta: {
        title: 'GS по периодам',
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
      path: '/dbp/report_8',
      name: 'report_8',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page8.vue')
      },
      meta: {
        title: 'Аксессуары',
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
      path: '/dbp/report_9',
      name: 'report_9',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page9.vue')
      },
      meta: {
        title: 'География',
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
      path: '/dbp/report_10',
      name: 'report_10',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page10.vue')
      },
      meta: {
        title: 'Анализ продаж номенклатура',
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
      path: '/dbp/report_11',
      name: 'report_11',
      components: {
        header: Header,
        aside: Aside,
        footer: Footer,
        default: () => import('@/views/DailyBusinessPositionApp/Page11.vue')
      },
      meta: {
        title: 'Рейтинг',
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