export default {
    addCart(content, payload) {
        // 1.查找之前数组中是否有该商品
        let oldProduct = content.state.carList.find(item => item.iid === payload.iid)

        // 2.判断oldProduct
        if (oldProduct) {
            content.commit('addCount', oldProduct)
        } else {
            payload.count = 1
            content.commit('addToCart', payload)
        }
    }

}