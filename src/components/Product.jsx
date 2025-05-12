import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Product = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const fetchPostApi = async () => {
    try {
      const result = await fetch("https://jsonplaceholder.typicode.com/posts");
      const response = await result.json();
      console.log("response:", response);
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate paginated posts
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  // Pagination controls
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    fetchPostApi();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-6 justify-around">
        {currentPosts.map((newcard, index) => (
          <Link to={`/product/${newcard.id}`}>
            <div key={index} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {newcard.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {newcard.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Product;
