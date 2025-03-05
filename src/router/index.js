import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Market from "../views/Market.vue";
import Search from "../views/Search.vue";
import More from "../views/More.vue";
import Activity from "../views/Activity.vue";
import Create from "../views/Create.vue";
import Wallet from "../views/Wallet.vue";



const routes = [
  { path: "/", component: Home },
  { path: "/market/:id", component: Market },
  { path: "/market", component: Market },
  { path: "/create", component: Create },
  { path: "/activity", component: Activity },
  { path: "/search", component: Search },
  { path: "/wallet", component: Wallet },

  { path: "/more", component: More }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
