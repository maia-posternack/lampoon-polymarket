import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Market from "../views/Market.vue";
import SearchResults from "../views/SearchResults.vue";
import More from "../views/More.vue";
import Activity from "../views/Activity.vue";
import Create from "../views/Create.vue";
import Wallet from "../views/Wallet.vue";
import MarketListPage from '../views/MarketListPage.vue';



const routes = [
  { path: "/", component: Home },
  {
    path: '/market/:tag',
    name: 'MarketList',
    component: MarketListPage,
    props: true, // Pass route params as props to the component
  },
    { path: "/market", component: Market },
  { path: "/create", component: Create },
  { path: "/activity", component: Activity },
  { path: "/search", component: SearchResults },
  { path: "/wallet", component: Wallet },
  { path: "/more", component: More }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});






export default router;
