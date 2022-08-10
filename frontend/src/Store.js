import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userDetail: localStorage.getItem('userDetail')
        ? JSON.parse(localStorage.getItem('userDetail'))
        : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        payMethod: localStorage.getItem('payMethod')
            ? localStorage.getItem('payMethod')
            : '',
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },

};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (x) => x._id === newItem._id
            );

            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item
                ) : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            return {
                ...state, cart: { ...state.cart, cartItems, },
            };
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };
        case 'USER_SIGNIN':
            return { ...state, userDetail: action.payload };
        case 'USER_SIGNOUT':
            return {
                ...state,
                userDetail: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                    payMethod: '',
                },
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload,
                },
            };
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    payMethod: action.payload,
                },
            };

        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>

}