import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
    carList: []
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
})

// 3.挂载到Vue实例中
export default store;