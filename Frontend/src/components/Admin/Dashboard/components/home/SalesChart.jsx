import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SalesChart = ({setAlert}) => {
  // Get the current month in 'YYYY-MM' format (e.g., '2024-12')
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Set default to current month
  const [salesData, setSalesData] = useState([]);
  const token = localStorage.getItem('adminToken');

  // Function to generate month options dynamically for the last 12 months
  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      // Set the date to the current month minus i months
      currentDate.setMonth(month - i);
      
      const formattedMonth = currentDate.toISOString().slice(0, 7); // 'YYYY-MM' format
      const monthLabel = currentDate.toLocaleString('default', { month: 'long' }) + " " + year; // 'Month YYYY' format
      options.push({ value: formattedMonth, label: monthLabel });
      
      // Restore current month for next iteration
      currentDate.setMonth(month);
    }

    return options.reverse(); // Reverse to display from the current month to 11 months before
  };

  const monthOptions = generateMonthOptions();

  useEffect(() => {
    // Fetch sales data from the backend based on selectedMonth
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/dashboard/sales?month=${selectedMonth}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response.data);

        // Directly use response.data.Data
        const data = response.data.Data;
        const formattedData = data.map(item => ({
          day: item._id, // Day of the month
          sales: item.totalSales, // Total sales for that day
        }));

        setSalesData(formattedData);
      } catch (err) {
        console.error("Failed to fetch sales data", err);
        setAlert(err.response.data)
        setSalesData([{day:0,sales:0}])
      }
    };

    fetchSalesData();
  }, [selectedMonth]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Sales Details</h2>
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="day" tickFormatter={(day) => `${day}th`} />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
