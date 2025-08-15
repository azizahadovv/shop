import React from 'react'
import {Route, Routes} from "react-router";
import Admin from "./pages/admin/Admin.jsx";
import User from "./pages/user/user.jsx";
import Login from "./pages/login/login.jsx";
import {ToastContainer} from "react-toastify";

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/user' element={<User/>}/>
            </Routes>

            <ToastContainer/>

        </div>
    )
}
