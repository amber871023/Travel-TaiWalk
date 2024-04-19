import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'spots',
        name: 'spots',
        component: () => import('../views/Spots.vue')
      },
      {
        path: 'spots/:ID',
        name: 'spot',
        component: () => import('../views/SpotDetail.vue')
      },
      {
        path: 'events',
        name: 'events',
        component: () => import('../views/Events.vue')
      },
      {
        path: 'events/:ID',
        name: 'event',
        component: () => import('../views/EventDetail.vue')
      },
      {
        path: 'taste-food',
        name: 'taste-food',
        component: () => import('../views/TasteFood.vue')
      },
      {
        path: 'taste-food/:ID',
        name: 'food',
        component: () => import('../views/FoodDetail.vue')
      }
    ]
  },
  // 重新導向
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Index'
    }
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
