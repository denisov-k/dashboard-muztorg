import Vue from 'vue'
import Router from 'vue-router'

import homeRoute from "./Home";
import app1 from "./App1";

Vue.use(Router);

let router = new Router({
  routes: [
    homeRoute,
    app1
  ]
})

export default router;