import { useContext } from "react";
import { CartContext } from "../../contexts/cart.conext";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	const { removeCartItemFromCart, decreaseItemFromCart, addItemToCart } =
		useContext(CartContext);

	const removeCartItemHandler = () => removeCartItemFromCart(cartItem);
	const decreaseHandler = () => decreaseItemFromCart(cartItem);
	const addHandler = () => addItemToCart(cartItem);

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div onClick={decreaseHandler} className="arrow">
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div onClick={addHandler} className="arrow">
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<div onClick={removeCartItemHandler} className="remove-button">
				&#10005;
			</div>
		</div>
	);
};
export default CheckoutItem;
