import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LoginRegister from './pages/LoginRegister'

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={<LoginRegister/>}/>
    </Routes>

   </Router>
  )
}

export default App
