import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selectors.js";
import {
	removeCartItemFromCart,
	decreaseItemFromCart,
	addItemToCart,
} from "../../store/cart/cart.actions.js";
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
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, quantity, price, imageUrl } = cartItem;

	const removeCartItemHandler = () =>
		dispatch(removeCartItemFromCart(cartItems, cartItem));
	const decreaseHandler = () =>
		dispatch(decreaseItemFromCart(cartItems, cartItem));
	const addHandler = () => dispatch(addItemToCart(cartItems, cartItem));

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
