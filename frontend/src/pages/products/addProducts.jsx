import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function AddProducts() {
    const BASE_URL = "http://localhost:8080/v1";
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [userId, setUserId] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        setUserId(localStorage.getItem("token"));
        getCategoryDb();
        getAllProducts();
    }, []);

    async function getCategoryDb() {
        try {
            const res = await axios.get(`${BASE_URL}/category`);
            setCategory(res.data);
        } catch (err) {
            toast.error(err.response?.data || err.message);
        }
    }

    async function getAllProducts() {
        try {
            const res = await axios.get(`${BASE_URL}/products`);
            setAllProducts(res.data);
        } catch (err) {
            toast.error("❌ Productlarni olishda xato: " + err.message);
        }
    }

    async function saveProduct() {
        if (!name || !price || !description || !categoryId) {
            toast.warning("Barcha maydonlarni to‘ldiring!");
            return;
        }
        if (price <= 0) {
            toast.warning("Narx 0 dan katta bo‘lishi kerak!");
            return;
        }

        try {
            if (editId) {
                await axios.put(`${BASE_URL}/products`, {
                    id: editId,
                    productName: name,
                    price,
                    description,
                    categoryId,
                    userId,
                });
                toast.success("✅ Product muvaffaqiyatli yangilandi!");
            } else {
                await axios.post(`${BASE_URL}/products`, {
                    productName: name,
                    price,
                    description,
                    categoryId,
                    userId,
                });
                toast.success("✅ Product muvaffaqiyatli qo‘shildi!");
            }
            resetForm();
            getAllProducts();
        } catch (err) {
            toast.error(err.response?.data || err.message);
        }
    }

    function resetForm() {
        setName("");
        setPrice("");
        setDescription("");
        setCategoryId("");
        setEditId(null);
    }

    async function deleteProduct(id) {
        if (!window.confirm("❗ Rostdan ham o‘chirmoqchimisiz?")) return;
        try {
            await axios.delete(`${BASE_URL}/products/${id}`);
            toast.success("🗑️ Product o‘chirildi!");
            getAllProducts();
        } catch (err) {
            toast.error(err.response?.data || err.message);
        }
    }

    function editProduct(product) {
        setEditId(product.id);
        setName(product.productName);
        setPrice(product.price);
        setDescription(product.description);
        setCategoryId(product.categoryId);
    }

    return (
        <div className="container py-4">
            {/* Form Card */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">{editId ? "Edit Product" : "Add Product"}</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Product name"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Price"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                            rows="3"
                            placeholder="Description"
                        ></textarea>
                    </div>

                    <div className="d-flex gap-3 align-items-center">
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="form-select w-50"
                        >
                            <option value="">-- Select Category --</option>
                            {category.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <button onClick={saveProduct} className="btn btn-success px-4">
                            {editId ? "Update" : "Save"}
                        </button>

                        {editId && (
                            <button onClick={resetForm} className="btn btn-secondary px-4">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className=" shadow-sm">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">All Products</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-light">
                        <tr>
                            <th style={{width: "50px"}}>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th style={{width: "180px"}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-3 text-muted">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            allProducts.map((res, index) => (
                                <tr key={res.id}>
                                    <td>{index + 1}</td>
                                    <td>{res.productName}</td>
                                    <td>${res.price}</td>
                                    <td title={res.description}>
                                        {res.description.length > 50
                                            ? res.description.substring(0, 50) + "..."
                                            : res.description}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => editProduct(res)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteProduct(res.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
