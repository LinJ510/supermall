import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/cart')
const Category = () => import('../views/category/category')
const Profile = () => import('../views/proflie/profile')
const Detail = () => import('../views/detail/Detail')

//1、安装插件
Vue.use(VueRouter)

//2、创建路由对象
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component:Detail
  }
]
//创建router
const router = new VueRouter({
  routes,
  mode:'history'
})


export default router
