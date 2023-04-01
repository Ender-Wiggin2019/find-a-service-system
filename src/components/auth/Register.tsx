import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import { useRegister, useGoogleSignIn } from "./UserContext";
import InputTextField from "../shared/InputTextField";
import { Role } from "../types/user";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordValid, setpasswordValid] = useState(false);
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role>("customer");

    const navigate = useNavigate();
    const { register } = useRegister();
    const { signInWithGoogle } = useGoogleSignIn();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordValid) {

            const success = await register(email, name, password, selectedRole, address, description);
            console.log('success', success)
            if (success) {
                console.log("Registering user with email: " + email + " and password: " + password);
                navigate("/login");
            }
        }
    };

    return (
        <section className="h-screen">
            <div className="container h-full px-6 py-24">
                <div
                    className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"/>
                    </div>
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <label
                            htmlFor="role"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            You are
                        </label>

                        <div className="flex">
                            <div className="flex-1 p-2">
                                <button
                                    onClick={() => setSelectedRole('serviceProvider')}
                                    className={`w-full flex items-center justify-center p-4 border rounded-lg transition ease-in-out duration-200 ${
                                        selectedRole === 'serviceProvider'
                                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                                            : 'bg-white hover:bg-gray-50 text-gray-900'
                                    }`}
                                >
                                    <span className="font-semibold leading-normal">Service Provider</span>
                                </button>
                            </div>
                            <div className="w-1"></div>
                            <div className="flex-1 p-2">
                                <button
                                    onClick={() => setSelectedRole('customer')}
                                    className={`w-full flex items-center justify-center p-4 border rounded-lg transition ease-in-out duration-200 ${
                                        selectedRole === 'customer'
                                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                                            : 'bg-white hover:bg-gray-50 text-gray-900'
                                    }`}
                                >
                                    <span className="font-semibold leading-normal">Customer</span>
                                </button>
                            </div>
                        </div>


                        <form onSubmit={handleSubmit}>
                            <InputTextField
                                label="Your email"
                                type="email"
                                placeholder="Email address"
                                onChange={(value) => setEmail(value)}
                            />
                            <InputTextField
                                label="Your name"
                                type="text"
                                placeholder="Name"
                                onChange={(value) => setName(value)}
                            />
                            <InputTextField
                                label="Your password"
                                type="password"
                                placeholder="Password"
                                onChange={(value) => setPassword(value)}
                            />

                            <InputTextField
                                label="Your password Again"
                                type="password"
                                placeholder="Password"
                                onChange={(value) => setPasswordConfirm(value)}
                            />
                            <PasswordChecklist
                                rules={["minLength","specialChar","number","capital","match"]}
                                minLength={6}
                                value={password}
                                valueAgain={passwordConfirm}
                                onChange={(isValid) => {setpasswordValid(isValid)}}
                            />

                            {selectedRole === "serviceProvider" && (
                                <>
                                <InputTextField
                                    label="Your Address"
                                    type="text"
                                    placeholder="Address"
                                    onChange={(value) => setAddress(value)}
                                />
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows={3}
                                        ></textarea>
                                    </div>
                                </>
                            )}
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Sign up
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                                Already has an account?  <a href="/login"
                                                              className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                            </p>

                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                    className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    OR
                                </p>
                            </div>

                            <button
                                onClick={signInWithGoogle}
                                className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
                                style={{ backgroundColor: "#9cc4ee" }}
                                href="#!"
                                role="button"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                <img className="mr-5 h-3.5 w-3.5" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google" />
                                Continue with Google
                            </button>
                            <button
                                onClick={signInWithGoogle}
                                className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                style={{ backgroundColor: "#3b5998"}}
                                href="#!"
                                role="button"
                                data-te-ripple-init
                                data-te-ripple-color="light">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-3.5 w-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                                Continue with Facebook
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Register;
