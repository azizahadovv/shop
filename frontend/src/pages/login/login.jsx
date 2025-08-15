import React, { useState } from "react";
import { logoReact } from "../../assets";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    async function handleAction() {
        if (!email || !password) {
            toast.error("Email and password are required!");
            return;
        }

        if (isRegister) {
            if (password !== repeatPassword) {
                toast.error("Passwords do not match!");
                return;
            }
            try {
                const res = await axios.post("http://localhost:8080/v1/register", {
                    username: email,
                    password
                });
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.id);
                    localStorage.setItem("role", res.data.role);
                    toast.success("Registered successfully");
                    setIsRegister(false);
                    navigate(res.data.role === "ADMIN" ? "/admin" : "/user");
                }
            } catch (err) {
                toast.error(err.response?.data || "Registration failed");
            }
        } else {
            try {
                const res = await axios.post("http://localhost:8080/v1/login", {
                    username: email,
                    password
                });
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.id);
                    localStorage.setItem("role", res.data.role);
                    toast.success("Logged in successfully");
                    navigate(res.data.role === "ADMIN" ? "/admin" : "/user");
                }
            } catch (err) {
                toast.error(err.response?.data || "Login failed");
            }
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-3">
            <div className="text-center w-25">
                <div className="form-signin">
                    <img
                        className="mb-4"
                        src={logoReact}
                        alt="Logo"
                        width="72"
                        height="72"
                    />
                    <h1 className="h3 mb-3 font-weight-normal">
                        {isRegister ? "Register" : "Please sign in"}
                    </h1>

                    <input
                        type="email"
                        className="form-control my-3"
                        placeholder="Email address"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control my-3"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isRegister && (
                        <input
                            type="password"
                            className="form-control my-3"
                            placeholder="Repeat password"
                            required
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    )}

                    <span
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-info"
                        style={{ cursor: "pointer" }}
                    >
                        {isRegister
                            ? "Already have an account? Sign in"
                            : "Don't have an account? Register"}
                    </span>

                    <button
                        onClick={handleAction}
                        className="btn btn-lg btn-primary btn-block mt-3"
                        type="button"
                    >
                        {isRegister ? "Register" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
