import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Alert from "../../Alert/Alert";
import Loading from "../../Alert/Loading";
import StockFilter from "./components/Stock/StockFilter";
import StockDataTable from "./components/Stock/StockDataTable";

const baseURL=import.meta.env.VITE_API_BACKEND;

const AdminProductStock = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("adminToken");

  const [searchParams] = useSearchParams(); // using useSearchParams to manage query parameters

  const fetchProductStock = async () => {
    try {
      setLoading(true);

      // Construct query parameters
      const queryParams = {
        pageno: page,
        category: searchParams.get("category"),
        subcategory: searchParams.get("subcategory"),
        stock: searchParams.get("stock"),
      };

      // console.log("Fetching products with params:", queryParams);

      const response = await axios.get(baseURL+"/admin/product-stock", {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      setProducts(response.data.products);
      setPagination(response.data.pagination);

      // console.log("Received pagination data:", response.data.pagination);

    } catch (err) {
      const error = err.response?.data || { type: "error", message: "An error occurred" };
      setAlert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductStock();
  }, [page, searchParams]); // refetch when page or query params change

  return (
    <div className="w-full mx-auto bg-gray-100">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-2xl px-4 mt-4 font-semibold mx-1">Product Stock List</h1>
          <StockFilter />
          <StockDataTable data={products} pagination={pagination} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default AdminProductStock;
