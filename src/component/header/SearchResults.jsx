/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiCall from '../utils/callApi';
import ProductDetails from '../product/ProductDetails';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSearchResults = () => {
      const search = searchParams.get('search');
      const category = searchParams.get('categoryOption');
      apiCall('data/products.json')
        .then((searchResults) => {
          let categoryResults = [];
          if (category === 'All') {
            categoryResults = Object.values(searchResults).flat();
          } else {
            categoryResults = Object.values(searchResults)
              .flat().filter((product) => product.categoryId === parseInt(category, 10));
          }
          if (search) {
            const results = categoryResults.filter((product) => {
              // Check if product.title is a string before calling string methods
              const title = product.title && typeof product.title === 'string'
                ? product.title.toLowerCase()
                : '';
              return title.includes(search.toLowerCase());
            });
            setProducts(results);
          } else {
            setProducts(categoryResults);
          }
        });
    };
    getSearchResults();
  }, [searchParams]);
  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">
      <span className="text-blue-700">Search Result</span>
      {products && products.length > 0 ? (
        products.map((product, key) => (
          <Link key={key} to={`/product/${product.id}`}>
            <div className="h-[250px] grid grid-cols-12 gap-3 rounded mt-1 mb-1">
              <div className="col-span-2 bg-gray-200 p-4 w-full">
                <img src={product.image[0]} alt="p_image" />
              </div>
              <div className="col-span-10 bg-gray-50 border-gray-100 hover:bg-gray-100">
                <ProductDetails product={product} titleFontSize="lg" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No products found.Please try to find other products</p>
      )}
    </div>
  );
};
export default SearchResults;
