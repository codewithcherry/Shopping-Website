import React from 'react'

const ProductPagination = ({ paginationData, onPageChange }) => {
    const { totalPages, currentpage, nextPage, prevPage } = paginationData;

    return (
      <div className="flex items-center justify-center gap-10 space-x-2 mt-4 mb-4">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Number(currentpage) - 1)}
          disabled={!prevPage}
          className={`px-4 py-2 text-white rounded ${
            prevPage
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Prev
        </button>
  
        {/* Page Indicators */}
        <span className="text-gray-600">
          Page {currentpage} of {totalPages}
        </span>
  
        {/* Next Button */}
        <button
          onClick={() => onPageChange(Number(currentpage) + 1)}
          disabled={!nextPage}
          className={`px-4 py-2 text-white rounded ${
            nextPage
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    );
}

export default ProductPagination
