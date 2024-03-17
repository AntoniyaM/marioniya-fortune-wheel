import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import PrizeAdd from '@/views/PrizeAdd.vue';
import PrizeEdit from '@/views/PrizeEdit.vue';
import PrizeList from '@/views/PrizeList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/list',
      name: 'list',
      component: PrizeList,
    },
    {
      path: '/add',
      name: 'add',
      component: PrizeAdd,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: PrizeEdit,
    },
  ],
})

export default router;
