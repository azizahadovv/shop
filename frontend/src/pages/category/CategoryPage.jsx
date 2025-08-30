import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function CategoryPage() {
    const BASE_URL = "http://localhost:8080/v1/category";
    const [getCategory, setGetCategory] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getCategoryData();
    }, []);

    function getCategoryData() {
        axios.get(`${BASE_URL}`).then((res) => setGetCategory(res.data));
    }

    function postCategory() {
        if (!categoryName.trim()) {
            toast.warning("Category name kiritilishi shart!");
            return;
        }

        if (editId) {
            axios
                .put(`${BASE_URL}`, {
                    id: editId,
                    name: categoryName,
                })
                .then((res) => {
                    toast.success(res.data);
                    getCategoryData();
                    setEditId(null);
                    setCategoryName("");
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        } else {
            axios
                .post(`${BASE_URL}`, {name: categoryName})
                .then((res) => {
                    toast.success(res.data);
                    getCategoryData();
                    setCategoryName("");
                })
                .catch((err) => toast.error(err.message));
        }
    }

    function editCategoryName(item) {
        setCategoryName(item.name);
        setEditId(item.id);
    }

    return (
        <div className="container py-4">

            {/* Card for input */}
            <div className="card shadow-sm mb-4">
                <div className="card-body d-flex gap-2">
                    <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Enter category name"
                    />
                    <button onClick={postCategory} className="btn btn-success">
                        {editId ? "Update" : "Save"}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className=" shadow-sm">
                <div className="card-header bg-dark text-white">
                    <h5 className="m-3">Categories</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-dark">
                        <tr>
                            <th style={{width: "50px"}}>#</th>
                            <th>Name</th>
                            <th style={{width: "200px"}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getCategory.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-3 text-muted">
                                    No categories found
                                </td>
                            </tr>
                        ) : (
                            getCategory.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                onClick={() => editCategoryName(item)}
                                                className="btn btn-sm btn-info"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    axios
                                                        .delete(`${BASE_URL}/${item.id}`)
                                                        .then((res) => {
                                                            toast.success(res.data);
                                                            getCategoryData();
                                                        })
                                                        .catch((err) => toast.error(err.message))
                                                }
                                                className="btn btn-sm btn-danger"
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
