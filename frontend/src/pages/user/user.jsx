import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import {FaEye, FaEyeSlash} from "react-icons/fa6";

export function User() {
    const [user, setUser] = useState([]);
    const [rodal, setRodal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    function getAllUsers() {
        axios
            .get("http://localhost:8080/v1/user")
            .then((res) => setUser(res.data))
            .catch((err) => toast.error(err.message));
    }

    const handleSubmit = () => {
        if (!username || !password) {
            toast.warning("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }
        // Backendga yuborish logikasi
        toast.success("Admin qo‘shildi!");
        setRodal(false);
        setUsername("");
        setPassword("");
    };

    return (
        <div className="container py-4">

            <button
                onClick={() => setRodal(true)}
                className="btn btn-info my-3 shadow-sm"
            >
                + Add Admin
            </button>

            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>UUID</th>
                    <th>USERNAME</th>
                    <th>PASSWORD</th>
                    <th>ROLE</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {user.map((users, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{users.id}</td>
                        <td>{users.username}</td>
                        <td>
                            <span className="badge bg-secondary">
                                {users.password}
                            </span>
                        </td>
                        <td>
                            <span
                                className={
                                    users.role === "ADMIN"
                                        ? "badge bg-success"
                                        : "badge bg-primary"
                                }
                            >
                                {users.role}
                            </span>
                        </td>
                        <td>
                            <button className="btn btn-sm btn-outline-danger">
                                delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Rodal
                visible={rodal}
                onClose={() => setRodal(false)}
                width={400}
                height={300}
                className="p-3"
            >
                <h4 className="text-center mb-3">➕ Create Admin</h4>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button
                        type="button"
                        className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setRodal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </Rodal>
        </div>
    );
}
