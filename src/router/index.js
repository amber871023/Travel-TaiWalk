import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'spots',
        component: () => import('../views/Spots.vue')
      },
      {
        path: 'spots/:ID',
        name: 'spot',
        component: () => import('../views/SpotDetail.vue')
      },
      {
        path: 'events',
        component: () => import('../views/Events.vue')
      },
      {
        path: 'events/:ID',
        name: 'event',
        component: () => import('../views/EventDetail.vue')
      },
      {
        path: 'taste-food',
        component: () => import('../views/TasteFood.vue')
      },
      {
        path: 'taste-food/:ID',
        name: 'food',
        component: () => import('../views/FoodDetail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 切換頁面畫面置頂
router.afterEach((to, from, next) => {
  // console.log(to, from, next)
  window.scrollTo(0, 0)
})

export default router
