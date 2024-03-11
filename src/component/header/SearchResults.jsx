/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiCall from '../utils/callApi';
import ProductDetails from '../product/ProductDetails';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">

      <span className="text-blue-700">Search Result</span>
      {products && products.length > 0 ? (
        <>
          {currentItems.map((product, key) => (
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

          ))}
          <div className="flex justify-center items-center mt-4">
            <button
              className={`border border-gray-300 rounded-md px-4 py-2 ${currentPage === 1 ? '' : 'hover:bg-cyan-600 bg-cyan-700 text-gray-100'}`}
              type="button"
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-4 border border-cyan-500 bg-gray-100 rounded-md px-4 py-2">{`${currentPage} - ${Math.ceil(products.length / itemsPerPage)}`}</span>
            <button
              className={`border border-gray-300   rounded-md px-4 py-2 ${indexOfLastItem >= products.length ? '' : 'hover:bg-cyan-600 bg-cyan-700 text-gray-100'}`}
              type="button"
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={indexOfLastItem >= products.length}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No products found.Please try to find other products</p>
      )}
    </div>

  );
};
export default SearchResults;
