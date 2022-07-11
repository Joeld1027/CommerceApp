import { useContext } from "react";
import { CartContext } from "../../contexts/cart.conext";
import {
	CheckoutItemContainer,
	ImageContainer,
	Value,
	Quantity,
	Arrow,
	RemoveButton,
	BaseSpan,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	const { removeCartItemFromCart, decreaseItemFromCart, addItemToCart } =
		useContext(CartContext);

	const removeCartItemHandler = () => removeCartItemFromCart(cartItem);
	const decreaseHandler = () => decreaseItemFromCart(cartItem);
	const addHandler = () => addItemToCart(cartItem);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={decreaseHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>{price}</BaseSpan>
			<RemoveButton onClick={removeCartItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};
export default CheckoutItem;
