import { createSlice } from '@reduxjs/toolkit'
import {
    saveItemToLocalStorage,
    updateItemListToLocalStorage,
} from '../utils/localStorage'

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload
        },
        addCart: (state, action) => {
            const product = action.payload

            if (!product) {
                return state
            }

            const foundInCart = state.items.some((item) => {
                return (
                    item.id === product.id && item.variant === product.variant
                )
            })

            if (foundInCart) {
                const newCart = state.items.map((item) => {
                    if (
                        item.id === product.id &&
                        item.variant === product.variant
                    ) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    }
                    return item
                })
                state.items = newCart
                updateItemListToLocalStorage(newCart, 'cartArray')
            } else {
                state.items.push(product)
                saveItemToLocalStorage(product, 'cartArray')
            }
        },
        removeFromCart: (state, action) => {
            const product = action.payload
            if (!product) {
                return state
            }

            const newCart = state.items
                .map((item) => {
                    if (
                        item.id === product.id &&
                        item.variant === product.variant
                    ) {
                        return null
                    }
                    return item
                })
                .filter(Boolean)
            state.items = newCart
            updateItemListToLocalStorage(newCart, 'cartArray')
        },
        clearCart: (state) => {
            state.items = []
            updateItemListToLocalStorage([], 'cartArray')
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCart, addCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
