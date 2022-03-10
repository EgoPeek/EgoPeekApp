import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import Register from './components/Register/Register';
import './components/Misc/ProtectedRoute'
import ProtectedRoute from './components/Misc/ProtectedRoute';

function App() {
  //session token will be stored in the brother and will be replaced later
  const logedIn = false;


  return (

    // main entrance point where all of our routes are going to be placed
    <div className='App main-container'>
      {/* renders this section if user is NOT logged in */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* protected route that only allows users who are logged in */}
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path='*' element={
            <div>
              404 not found
            </div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
