import React, { useEffect, useState } from "react";
import axios from "axios";
import { imageProduct } from "../../assets/index.jsx";
import { toast } from "react-toastify";

export function AllProducts() {
    const [products, setProducts] = useState([]);
    const [countI, setCountI] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setUserId(localStorage.getItem("token"));

        axios.get("http://localhost:8080/v1/products")
            .then((res) => {
                setProducts(res.data);
                setCountI(res.data.reduce((acc, p) => {
                    acc[p.id] = 0;
                    return acc;
                }, {}));
            })
            .catch((err) => {
                toast.error("❌ Productlarni olishda xato: " + err.message);
            });
    }, []);

    function increaseCount(id) {
        setCountI(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    }

    function decreaseCount(id) {
        setCountI(prev => ({
            ...prev,
            [id]: prev[id] > 0 ? prev[id] - 1 : 0
        }));
    }

    function handleBuy(product) {
        const count = countI[product.id] || 0;

        if (!userId) {
            toast.error("⚠️ Iltimos, avval login qiling!");
            return;
        }

        if (count > 0) {
            const basketItem = {
                productName: product.productName,
                count,
                price: product.price,
                userId
            };

            axios.post("http://localhost:8080/v1/basket", basketItem)
                .then(() => {
                    toast.success(`✅ ${product.productName} savatchaga qo‘shildi!`);
                })
                .catch((err) => {
                    toast.error("❌ Savatchaga qo‘shishda xato: " + err.message);
                });
        } else {
            toast.error(`⚠️ ${product.productName} uchun count 0, qo‘shilmadi`);
        }
    }

    return (
        <div className="container py-4">
            <h3 className="mb-4 fw-bold text-center">📦 All Products</h3>
            <div className="row g-4">
                {products.length === 0 ? (
                    <p className="text-center text-muted">No products found</p>
                ) : (
                    products.map((res) => (
                        <div key={res.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm border-0 product-card">
                                <img
                                    src={imageProduct}
                                    className="card-img-top product-img"
                                    alt="product"
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-truncate">{res.productName}</h5>
                                    <p className="fw-bold text-success mb-1">{res.price} so‘m</p>
                                    <p className="card-text text-muted small flex-grow-1">
                                        {res.description.length > 70
                                            ? res.description.substring(0, 70) + "..."
                                            : res.description}
                                    </p>

                                    <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                                        <button
                                            className="btn btn-outline-primary btn-sm px-3"
                                            onClick={() => decreaseCount(res.id)}
                                        >
                                            -
                                        </button>
                                        <span className="fw-bold">{countI[res.id] || 0}</span>
                                        <button
                                            className="btn btn-outline-primary btn-sm px-3"
                                            onClick={() => increaseCount(res.id)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-success w-100 mt-auto"
                                        onClick={() => handleBuy(res)}
                                    >
                                        🛒 BUY
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
