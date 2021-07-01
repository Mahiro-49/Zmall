export default {
    addCart(content, payload) {
        return new Promise((resolve, reject) => {
            // 1.查找之前数组中是否有该商品
            let oldProduct = content.state.carList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct
            if (oldProduct) {
                content.commit('addCount', oldProduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                content.commit('addToCart', payload)
                resolve('添加了新的商品')
            }
        })

    }

}