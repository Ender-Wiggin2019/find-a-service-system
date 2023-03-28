import React, { useState } from "react";
import { useAuthState, useSignIn, useRegister } from "./UserContext";
import { Role } from "../types/user"
const LoginRegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role>(null);
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const { signIn } = useSignIn();
    const { register } = useRegister();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            await signIn(email, password);
        } else {
            await register(email, password, role, address, description);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {!isLogin && (
                    <>
                        <div className="mb-4">
                            <span className="text-gray-700 text-sm font-bold">Role</span>
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="service_provider"
                                        checked={role === "service_provider"}
                                        onChange={(e) => setRole(e.target.value as "service_provider")}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Service Provider</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={(e) => setRole(e.target.value as "user")}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">User</span>
                                </label>
                            </div>
                        </div>
                        {role === "service_provider" && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus
            focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows={3}
                                    ></textarea>
                                </div>
                            </>
                        )}
                    </>
                )}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isLogin ? "Sign In" : "Register"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        {isLogin ? "Register" : "Sign In"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginRegisterForm;
