import Vue from 'vue'
import VueRouter from 'vue-router'



// 路径懒加载
const Home = () =>
    import ('../views/home/Home.vue')
const Cart = () =>
    import ('../views/cart/Cart.vue')
const Profile = () =>
    import ('../views/profile/Profile.vue')
const Category = () =>
    import ('../views/category/Category.vue')
const Detail = () =>
    import ('../views/detail/Detail.vue')
    // 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        // 动态路由需要加/:iid
        path: '/detail/:iid',
        component: Detail
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// 3.导出路由
export default router