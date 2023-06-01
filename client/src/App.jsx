import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./Pages/Main";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import List from "./Pages/List";
import Account from "./Pages/Account";
import Marketing from "./Pages/Marketing";
import Soon from "./Components/Soon";
import { useEffect } from "react";
import { getMe, checkIsAuth } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  useEffect(() => {
    dispatch(getMe());
    // if (!isAuth) {
    //   navigate("/");
    // }
    console.log(isAuth);
  }, []);

  return (
    <div className="app_container">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/2w*edRf34N*7" element={<List />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ToastContainer position="top-left" />
      <Soon />
    </div>
  );
}

export default App;
