import React from "react";
import { UsersIcon, CubeIcon, ChartBarIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

const DashboardHomeHeader = ({ headerData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {/* Total Users */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">{headerData.totalUsers}</p>
          <p className="text-sm text-green-500 mt-1">↑ 1.3% Up from past week</p>
        </div>
        <UsersIcon className="h-10 w-10 text-purple-500" />
      </div>

      {/* Total Orders */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800">{headerData.totalOrders}</p>
          <p className="text-sm text-red-500 mt-1">↓ 4.3% Down from yesterday</p>
        </div>
        <CubeIcon className="h-10 w-10 text-yellow-500" />
      </div>

      {/* Total Sales */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-800">$ {Math.ceil((headerData.totalSales)/1000)}k</p>
          <p className="text-sm text-green-500 mt-1">↑ 8.5% Up from yesterday</p>
        </div>
        <ChartBarIcon className="h-10 w-10 text-green-500" />
      </div>

      {/* Total Pending */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
          <p className="text-2xl font-bold text-gray-800">{headerData.totalProducts}</p>
          <p className="text-sm text-green-500 mt-1">↑ 1.8% Up from yesterday</p>
        </div>
        <ClipboardDocumentCheckIcon className="h-10 w-10 text-orange-500" />
      </div>
    </div>
  );
};

export default DashboardHomeHeader;
