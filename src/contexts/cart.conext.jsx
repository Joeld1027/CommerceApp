import { createContext, useEffect, useState } from "react";

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
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	decreaseItemFromCart: () => {},
	removeCartItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const totalCount = cartItems.reduce(
			(previousValue, currentValue) => previousValue + currentValue.quantity,
			0
		);
		setCartCount(totalCount);
	}, [cartItems]);
	useEffect(() => {
		const totalPrice = cartItems.reduce(
			(previousValue, currentValue) =>
				previousValue + currentValue.quantity * currentValue.price,
			0
		);
		setCartTotal(totalPrice);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const decreaseItemFromCart = (productToRemove) => {
		setCartItems(decreaseCartItem(cartItems, productToRemove));
	};

	const removeCartItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
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
