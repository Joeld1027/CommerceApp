import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selectors";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
	CartDropdownContainer,
	EmptyMessage,
	CartItems,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => {
						return <CartItem key={item.id} cartItem={item} />;
					})
				) : (
					<EmptyMessage>You Cart is empty</EmptyMessage>
				)}
			</CartItems>

			<Link to="/checkout">
				<Button>GO TO CHECKOUT</Button>
			</Link>
		</CartDropdownContainer>
	);
};
export default CartDropdown;
