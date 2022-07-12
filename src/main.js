import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import Config from './utils/Config';
import AuthUtils from './utils/AuthUtils';
import SessionActions from './store/store-session-actions';
import i18n from './i18n';

import InlineSvg from 'vue-inline-svg';
Vue.component('inline-svg', InlineSvg);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  let routeGroups = to.meta.authGroups || [];
  let routeRedirect = to.meta.authRedirect;
  let userGroups = store.state.session.user.groups || [];

  if (AuthUtils.hasGroupsAny(userGroups, routeGroups)) {
    next();
  } else {
    console.warn('User has no permission for route:', to, 'redirecting to:', routeRedirect);
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

Config.init().then(() => {
  store.dispatch(SessionActions.AUTH).then(() => {
    new Vue({
      router,
      store,
      i18n,
      render: h => h(App),
    }).$mount('#app');
  })
})