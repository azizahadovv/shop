import React from "react";
import {FaShoppingBasket} from "react-icons/fa";
import {AllProducts} from "../products/allProducts.jsx";
import {useNavigate} from "react-router";

export default function Home() {
    const navigate = useNavigate()
    return <div>
        <nav className="navbar bg-body-secondary">
            <div className="container-fluid">
                <a className="navbar-brand">Navbar</a>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <button onClick={() => navigate('/login')} className="btn btn-outline-success" type="submit">login</button>
                    <button className="btn btn-outline-success" type="submit"><FaShoppingBasket/></button>
                </div>
            </div>
        </nav>


        <div>
            <AllProducts/>
        </div>

    </div>
}
;