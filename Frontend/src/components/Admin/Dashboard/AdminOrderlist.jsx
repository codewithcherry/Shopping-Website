import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Alert from "../../Alert/Alert";
import Loading from "../../Alert/Loading";
import OrderFilter from "./components/orders/OrderFilter";
import DataTable from "./components/orders/DataTable";

const baseURL=import.meta.env.VITE_API_BACKEND;

const AdminOrderlist = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [refresh, setRefresh] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("adminToken");

  const fetchOrderlistServer = async () => {
    try {
      setLoading(true);

      // Construct query parameters
      const queryParams = {
        pageno: page,
        date: searchParams.get("date"),
        orderType: searchParams.get("orderType"),
        orderStatus: searchParams.get("orderStatus"),
      };

      const response = await axios.get(baseURL+"/admin/order-list", {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (err) {
      const error = err.response?.data || { type: "error", message: "An error occurred" };
      setAlert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderlistServer();
  }, [refresh, page, searchParams]);

  return (
    <div className="w-full mx-auto bg-gray-100">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-2xl px-4 mt-4 font-semibold mx-1">Order List</h1>
          <OrderFilter date={searchParams.get("date")}/>
          <DataTable data={orders} pagination={pagination} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default AdminOrderlist;
