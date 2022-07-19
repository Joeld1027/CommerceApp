import { useDispatch, useSelector } from "react-redux";
import {
	selectCartCount,
	selectIsCartOpen,
} from "../../store/cart/cart.selectors";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import {
	CartIconContainer,
	ShoppingIcon,
	ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount className="item-count">{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
