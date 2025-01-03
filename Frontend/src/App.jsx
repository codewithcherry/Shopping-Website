import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Admin/Dashboard";
import AdminHome from "./components/Admin/Dashboard/AdminHome";
import AdminProducts from "./components/Admin/Dashboard/AdminProducts";
import AdminInbox from "./components/Admin/Dashboard/AdminInbox";
import AdminOrderlist from "./components/Admin/Dashboard/AdminOrderlist";
import AdminProductStock from "./components/Admin/Dashboard/AdminProductStock";
import AdminCalender from "./components/Admin/Dashboard/AdminCalender";
import AdminTodo from "./components/Admin/Dashboard/AdminTodo";
import AdminContact from "./components/Admin/Dashboard/AdminProfile";
import AdminInvoice from "./components/Admin/Dashboard/AdminInvoice";
import AdminTeam from "./components/Admin/Dashboard/AdminTeam";
import AdminSettings from "./components/Admin/Dashboard/AdminSettings";
import AdminAddProduct from "./components/Admin/Dashboard/AdminAddProduct";
import ProductDetails from "./pages/ProductDetails";
import { UserAuthContext } from "./components/Navigation/UserAuthContext";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ContactUs from "./pages/ContactUs";
import ViewAdminProduct from "./components/Admin/Dashboard/components/products/ViewAdminProduct";
import AdminAllProducts from "./components/Admin/Dashboard/components/products/AdminAllProducts";
import EditAdminProductForm from "./components/Admin/Dashboard/components/products/EditAdminProductForm";
import AdminProfile from "./components/Admin/Dashboard/AdminProfile";

function App() {
  return (
    <>
      <UserAuthContext>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Account />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/shop/:category/" element={<Shop />} />
            <Route path="/shop/:category/:subCategory" element={<Shop />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/admin/dashboard" element={<Dashboard />}>
              <Route path="" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />}>
                <Route path="" element={<AdminAllProducts />}/>
                <Route path="edit" element={<EditAdminProductForm />}/>
                <Route path=":productId" element={<ViewAdminProduct />} />
              </Route>
              <Route path="add-product" element={<AdminAddProduct />} />
              <Route path="inbox" element={<AdminInbox />} />
              <Route path="orders" element={<AdminOrderlist />} />
              <Route path="product-stock" element={<AdminProductStock />} />
              <Route path="calendar" element={<AdminCalender />} />
              <Route path="to-do" element={<AdminTodo />} />
              <Route path="account" element={<AdminProfile />} />
              <Route path="invoice" element={<AdminInvoice />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserAuthContext>
    </>
  );
}

export default App;
