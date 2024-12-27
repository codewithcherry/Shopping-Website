import React from "react";
import { useNavigate } from "react-router-dom";

const StockDataTable = ({ data, pagination, setPage }) => {
  const statusClass = (status) => {
    switch (status) {
      case 'in stock':
        return 'bg-green-100 text-green-700';
      case 'selling fast':
        return 'bg-blue-100 text-blue-700';
      case 'out of stock':
        return 'bg-red-100 text-red-700';
      case 'only few left':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const onPageChange = (page) => {
    setPage(page);
    // console.log("page button clicked", page);
  };

  const navigate=useNavigate()

  const hanldeProductIdClick=(id)=>{
    navigate(`/admin/dashboard/products/${id}`);
  }

  // Ensure pagination values are valid
  const currentPage = Number(pagination?.currentPage) || 1;
  const totalItems = Number(pagination?.total) || 0;
  const itemsPerPage = 10; // Assuming each page shows 10 items
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-white text-left border-b hover:bg-gray-50 rounded-xl">
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">ID</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Product Title</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">SKU Code</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">category</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">subcategory</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Restock Date</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">stock</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-3 py-3 text-sm text-gray-700 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm text-blue-700 hover:cursor-pointer hover:underline" onClick={()=>hanldeProductIdClick(row._id)}>{row._id.slice(15, row._id.length)}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {row.title}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">{row.sku}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">{row.category}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">{row.subCategory}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {new Date(row.restockDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">{row.stockQuantity}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusClass(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        {/* Pagination Info */}
        <span className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium">{totalItems > 0 ? startItem : 0}</span>-
          <span className="font-medium">{totalItems > 0 ? endItem : 0}</span> of{" "}
          <span className="font-medium">{totalItems}</span>
        </span>

        {/* Pagination Buttons */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!pagination?.prevPage}
            className={`px-3 py-2 text-sm font-medium border rounded-md ${
              !pagination?.prevPage
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            &lt;
          </button>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!pagination?.nextPage}
            className={`px-3 py-2 text-sm font-medium border rounded-md ${
              !pagination?.nextPage
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockDataTable;
