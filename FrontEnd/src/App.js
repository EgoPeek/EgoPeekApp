import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login/Login"

function App() {
  return (

    // main entrance point where all of our routes are going to be placed
    <div className='App main-container' style={{height:'100%'}}>
      <Router>
        <Routes>
          {/* when we eventually put a home page just pull in the file */}
          {/* <Route path='/home' exact component={home}></Route> */}
          <Route path='/login' element={<Login />} />
          <Route path='*' element={
            <div>
              404 not found
            </div>} />
        </Routes>
      </Router>
    </div>
  );
}

// testing from js file 
export default App;
