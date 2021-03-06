import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import { CategoriesContext } from '../../contexts/categories.context';
import {
	selectCategoriesIsLoading,
	selectCategoriesMap,
} from '../../store/categories/categories.selectors';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';
import { CartItem } from '../../store/cart/cart.types';

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts] = useState(categoriesMap[category]);
	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);
	return (
		<Fragment>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='category-container'>
					{products &&
						products.map((product) => <ProductCard key={product.id} product={product as CartItem} />)}
				</div>
			)}
		</Fragment>
	);
};

export default Category;
