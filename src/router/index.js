import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index";
import episodeDetail from "../views/episodeDetail";
import characterDetail from "../views/characterDetail";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/episode-detail/:id",
    name: "episodeDetail",
    component: episodeDetail
  },
  {
    path: "/character-detail/:name",
    name: "characterDetail",
    component: characterDetail
  }
];

const router = new VueRouter({
  routes
});

export default router;
