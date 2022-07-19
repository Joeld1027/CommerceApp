import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selectors";
import { addItemToCart } from "../../store/cart/cart.actions";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	ProductCardContainer,
	Footer,
	PriceSpan,
	NameSpan,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={name} />
			<Footer>
				<NameSpan>{name}</NameSpan>
				<PriceSpan>${price}.00</PriceSpan>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
