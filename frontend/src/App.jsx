import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LoginRegister from './pages/LoginRegister'
import ProductList from './pages/ProductList';
import ProtectedRoute from './middleware/ProtectedRoute';
import Cart from './pages/Cart';
import CheckOut from './pages/Checkout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProtectedRoutes from './middleware/AdminProtectRoute';
import AdminProducts from './pages/admin/AdminProducts'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='/products' element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>


        } />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }></Route>

        <Route path='/checkout' element={<CheckOut />} />

        <Route path='/adminDashboard' element={
          <AdminProtectedRoutes>
            <AdminDashboard />
          </AdminProtectedRoutes>


        } />

        <Route path="/admin/products" element={
          <AdminProtectedRoutes>
            <AdminProducts />
          </AdminProtectedRoutes>

        } />


      </Routes>





    </Router>
  )
}

export default App
