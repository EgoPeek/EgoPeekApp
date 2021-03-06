/**
 * FileName: App.js
 * Description: Holds all of the Browser routes that the user can access through EgoPeek
 *  locking visited routes only through a valid login
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import "./components/Misc/CustomComponents/ProtectedRoute";
import "./components/UserFeed/UserFeed";
import ProtectedRoute from "./components/Misc/CustomComponents/ProtectedRoute";
import UnProtectedRoute from "./components/Misc/CustomComponents/UnProtectedRoutes";
import UserFeed from "./components/UserFeed/UserFeed";
import Account from "./components/Account/Account";
import Submit from "./components/Submit/Submit";
import UserSettings from "./components/AccountSettings/AccountSettings";
import ResetRequest from "./components/Reset/ResetRequest";
import RequestSent from "./components/Reset/RequestSent";
import ResetPassword from "./components/Reset/ResetPassword";
import Chat from "./components/Chat/Chat";
import DirectMessage from "./components/DirectMessage/DirectMessage";
import Interests from "./components/Interests/Interests";
import ChatList from "./components/ChatList/ChatList";
import AboutUs from "./components/About/About";
import Discover from "./components/Discover/Discover";
import useAvatar from "./hooks/useAvatar";
import { useEffect } from "react";

function App() {
  //session token will be stored in the brother and will be replaced later
  //fetches avatar on app load  
  const { fetchNewAvatar } = useAvatar()
  useEffect(() => {
    fetchNewAvatar()
  }, [])


  return (
    // main entrance point where all of our routes are going to be placed
    <div className="App main-container">
      <Router>
        <Routes>
          {/* if a user is NOT logged in, only unprotected routes are shown*/}
          <Route path="/" element={<UnProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset/email" element={<ResetRequest />} />
            <Route path="/reset/sent" element={<RequestSent />} />
            <Route path="/reset/password" element={<ResetPassword />} />
          </Route>

          {/* if a user IS logged in protected routes are shown */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/account/:username" element={<Account />} />
            <Route path="/home" element={<UserFeed />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/message/:username" element={<DirectMessage />} />
            <Route path="/message" element={<DirectMessage />} />
            <Route path="/chat/:game" element={<Chat />} />
            <Route path="/chat/" element={<ChatList />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/discover" element={<Discover />} />
          </Route>


          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
