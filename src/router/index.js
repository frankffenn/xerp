import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path:'/home',
      component: () => import ('../components/page/Home.vue'),
      meta: { title: '首页'},
      children: [
        {
          path: '/staff',
          component: () => import(/* webpackChunkName: "login" */ '../components/page/Staff.vue'),
          meta: { title: '员工查询' }
        },
        {
          path: '/stock',
          component: () => import(/* webpackChunkName: "login" */ '../components/page/Stock.vue'),
          meta: { title: '库存查询' }
        },
        {
          path: '/order_sales',
          component: () => import(/* webpackChunkName: "login" */ '../components/page/OrderSales.vue'),
          meta: { title: '客户订单' }
        },
        {
          path: '/order_purchases',
          component: () => import(/* webpackChunkName: "login" */ '../components/page/OrderPurchase.vue'),
          meta: { title: '采购订单' }
        },
        {
          path: '/commodity',
          component: () => import(/* webpackChunkName: "login" */ '../components/page/Commodity.vue'),
          meta: { title: '商品管理' }
        },
        {
          path: '/finance',
          component: () => import(/* webpackChunkName: "login" */ '../components/page/Finance.vue'),
          meta: { title: '财务管理' }
        },
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
