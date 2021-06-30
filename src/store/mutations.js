export default {
    addCount(state, payload) {
        payload.count++;
    },
    addToCart(state, payload) {
        payload.checked = true;
        state.carList.push(payload);
    }
}