import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: require("@/pages/Home").default,
    },
    {
      path: "/data/:name",
      name: "data",
      component: require("@/pages/Data").default,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
