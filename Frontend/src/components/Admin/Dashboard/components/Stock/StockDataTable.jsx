import React from "react";
import {useNavigate} from 'react-router-dom';

const StockDataTable = ({data,pagination,setPage}) => {
  
   const navigate=useNavigate()

  const statusClass = (status) => {
    switch (status) {
      case 'in stock':
        return "bg-green-100 text-green-700";
      case "selling fast":
        return "bg-blue-100 text-blue-700";
      case 'out of stock':
        return "bg-red-100 text-red-700";
      case 'only few left':
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleProductIdClick=(id)=>{
    navigate(`/admin/dashboard/products/${id}`)
  }

  const onPageChange =(page)=>{
    setPage(page);
    console.log('page button clicked',page)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-white text-left border-b hover:bg-gray-50 rounded-xl">
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">ID</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Product Title</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">SKU-CODE</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Restock Date</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Stock Availability</th>
              <th className="px-3 py-3 font-semibold text-sm text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-3 py-3 text-sm text-blue-700 hover:cursor-pointer" onClick={()=>handleProductIdClick(row._id)}>{row._id}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{row.title}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{row.sku}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{row.restockDate}</td>
                <td className="px-3 py-3 text-sm text-gray-700">{row.stockQuantity}</td>
                <td className="px-3 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        pagination && <div className="flex items-center justify-between mt-4">
        {/* Pagination Info */}
        <span className="text-sm text-gray-600">
          Showing <span className="font-medium">{((Number(pagination.currentpage) - 1) * 10) }</span>-
          <span className="font-medium">{pagination.currentpage*9>pagination.total?pagination.total:pagination.currentpage*9}</span> of{" "}
          <span className="font-medium">{pagination.total }</span>
        </span>
  
        {/* Pagination Buttons */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(Number(pagination.currentpage) - 1)}
            disabled={!pagination.prevPage}
            className={`px-3 py-2 text-sm font-medium border rounded-md ${
              !pagination.prevPage
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            &lt;
          </button>
  
          {/* Next Button */}
          <button
            onClick={() => onPageChange(Number(pagination.currentpage) + 1)}
            disabled={!pagination.nextPage}
            className={`px-3 py-2 text-sm font-medium border rounded-md ${
              !pagination.nextPage
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
      }
    </div>
  );
};

export default StockDataTable;
