/**
 * FileName: App.js
 * Description: Holds all of the Browser routes that the user can access through EgoPeek
 *  locking visited routes only through a valid login
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import Register from './components/Register/Register';
import './components/Misc/CustomComponents/ProtectedRoute'
import './components/UserFeed/UserFeed'
import ProtectedRoute from './components/Misc/CustomComponents/ProtectedRoute';
import UnProtectedRoute from './components/Misc/CustomComponents/UnProtectedRoutes'
import UserFeed from './components/UserFeed/UserFeed';
import Account from './components/Account/Account';

function App() {
  //session token will be stored in the brother and will be replaced later

  return (

    // main entrance point where all of our routes are going to be placed
    <div className='App main-container'>
      {/* renders this section if user is NOT logged in */}
      <Router>
        <Routes>
          {/* if you want to test a route simply place it at the top and navigate within the browser
              place route within the appropriate location when finished
           */}

          {/* if a user is NOT logged in, only unprotected routes are shown*/}
          <Route path='/' element={<UnProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/account" element={<Account />} /> {/* move to protected */}
          </Route>

          {/* if a user IS logged in protected routes are shown */}
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='home' element={<UserFeed />} />
          </Route>

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
