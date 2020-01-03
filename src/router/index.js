import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product',
    name: 'Product',
    redirect: '/product/page1',
    component: () => import('../views/product.vue'),
    children: [
      {
        path: 'goods-:id',
        name: 'Goods',
        component: () => import('../views/goods.vue')
      },
      {
        path: 'page:id',
        name: 'Clocks',
        component: () => import('../views/clocks.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/basket.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
