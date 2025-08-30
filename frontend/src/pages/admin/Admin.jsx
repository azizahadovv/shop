import React, {useEffect} from "react";
import SideBar from "../../settings/sideBar.jsx";
import {useLocation} from "react-router-dom";
import CategoryPage from "../category/CategoryPage.jsx";
import {AddProducts} from "../products/addProducts.jsx";
import axios from "axios";
import {useNavigate} from "react-router";
import {User} from "../user/user.jsx";

export default function Admin() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate()

    // ?dan keyingi faqat param nomini olish (?orders → orders)


    const page = queryParams.keys().next().value;
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    useEffect(() => {
        axios.get("http://localhost:8080/v1/admin/checking").then(res => {
            // Token va role-ni backenddan kelgan qiymatlar bilan solishtiramiz
            if (res.data.id !== token || res.data.role !== role) {
                navigate("/login");
                localStorage.clear()
            }
        }).catch(() => {
            // Agar request xato bo‘lsa (masalan token noto‘g‘ri) → login page
            navigate("/login");
        });
    }, [navigate, page, role, token]);

    return (
        <div>
            <nav className="navbar bg-primary py-3 justify-content-end px-5" data-bs-theme="dark">
                <SideBar/>
            </nav>

            {page === "category" ? (
                <CategoryPage/>
            ) : page === "product" ? (
                <AddProducts/>
            ) : page === "users" ? <User/>


                :
                (
                    "Salom"
                )}

        </div>
    );
}
