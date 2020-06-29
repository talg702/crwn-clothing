export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const removeItem = (cartItems, removedITem) => {
    const removed = cartItems.find(item => item.id === removedITem.id);
    if (removed.quantity === 1) {
        return cartItems.filter(item => item.id !== removed.id);
    }
    return cartItems.map(item =>  item.id === removed.id 
        ? { ...item, quantity: item.quantity - 1 } 
        : item)
    

}