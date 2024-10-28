import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Admin/Dashboard';
import AdminHome from './components/Admin/AdminHome';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/orders" element={<Orders />}/> 
        <Route path="/cart" element={<Cart/>}/> 
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} >
              <Route path='' element={<AdminHome />} /> 
        </Route>
        <Route path="*" element={<NotFound />}/> 
      </Routes>
    </Router>
    </>
  )
}

export default App
