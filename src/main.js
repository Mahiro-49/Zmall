import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoaf from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 使用懒加载的插件
Vue.use(VueLazyLoaf, {
    loading: require('./assets/img/common/load.gif')
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')