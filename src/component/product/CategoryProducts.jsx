import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import apiCall from '../utils/callApi';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      apiCall('data/products.json')
        .then((productResults) => {
          setProducts(productResults);
        });
    };
    getProducts();
  }, [categoryId]);
  useEffect(() => {
  }, [products]);

  const selectedCategoryProducts = categoryId
    ? Object.values(products).filter((product) => String(product.categoryId) === categoryId)
    : [];

  return (
    <div className="pt-16">
      {
            selectedCategoryProducts && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 lg:px-24">

              {
                        selectedCategoryProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))
                    }
            </div>
            )
        }
    </div>
  );
};
export default CategoryProducts;
