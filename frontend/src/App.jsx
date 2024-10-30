import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LoginRegister from './pages/LoginRegister'
import ProductList from './pages/ProductList';
import ProtectedRoute from './middleware/ProtectedRoute';

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={<LoginRegister/>}/>
      <Route path='/products' element={
        <ProtectedRoute>
             <ProductList/>
        </ProtectedRoute>
       
        
        } />
    </Routes>

   </Router>
  )
}

export default App
