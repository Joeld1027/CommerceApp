import { useNavigate } from "react-router-dom";
import {
	DirectoryItemContainer,
	BackgroundImage,
	Body,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(category.route);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={category.imageUrl} />
			<Body>
				<h2>{category.title}</h2>
				<p>Show Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
