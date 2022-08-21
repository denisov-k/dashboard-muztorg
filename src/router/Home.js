import Header from "@/layouts/Header";
import Aside from "@/layouts/Aside";
import Footer from "@/layouts/Footer";

let route = {
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
    title: 'Аналитическая платформа',
    description: '',
    viewTitle: 'Главная',
    viewDescription: '',
    icon: '',
    visible: false,
    authGroups: [],
  },
  children: [],
};

export default route;