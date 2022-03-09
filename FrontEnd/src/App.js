import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import Register from './components/Register/Register';

function App() {
  return (

    // main entrance point where all of our routes are going to be placed
    <div className='App main-container'>
      <Router>
        <Routes>
          {/* when we eventually put a home page just pull in the file */}
          {/* <Route path='/home' exact component={home}></Route> */}
          <Route path='/' element={<Home/>} />
          <Route index path='/home' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>} />
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
