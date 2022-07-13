import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (arr, productToRemove) => {
	return arr.filter((item) => {
		return item.id !== productToRemove.id;
	});
};

const decreaseCartItem = (cartItems, productToRemove) => {
	if (productToRemove.quantity > 1) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
	}
	return removeCartItem(cartItems, productToRemove);
};

export const CartContext = createContext({
	isCartOpen: true,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	decreaseItemFromCart: () => {},
	removeCartItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
	SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`unhandled type of ${type} in cartReducer`);
	}
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { cartItems, cartTotal, isCartOpen, cartCount } = state;

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(previousValue, currentValue) => previousValue + currentValue.quantity,
			0
		);

		const newCartTotal = newCartItems.reduce(
			(previousValue, currentValue) =>
				previousValue + currentValue.quantity * currentValue.price,
			0
		);
		return dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			},
		});
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const decreaseItemFromCart = (productToRemove) => {
		const newCartItems = decreaseCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const removeCartItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch({
			type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
			payload: bool,
		});
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		decreaseItemFromCart,
		removeCartItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
