import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';

import { Role } from "../types/user";
import {useAuthState} from "~/components/auth/UserContext";
import ImageUploader from "./ImageUploader";
import InputTextField from "../shared/InputTextField";

const ServiceCreatorPage: React.FC = () => {
    const { state } = useAuthState();

    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [price, setPrice] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (passwordValid) {
        //
        //     const success = await register(email, name, password, selectedRole, address, description);
        //     console.log('success', success)
        //     if (success) {
        //         console.log("Registering user with email: " + email + " and password: " + password);
        //         navigate("/login");
        //     }
        // }
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



                        <form onSubmit={handleSubmit}>
                            <InputTextField
                                label="Your service name"
                                type="text"
                                placeholder="Service Name"
                                onChange={(value) => setName(value)}
                            />
                            <ImageUploader />
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <label
                                    htmlFor="text"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your service price
                                </label>
                                <CurrencyInput
                                    id="currency-input"
                                    name="currency-input"
                                    placeholder="Please enter a number"
                                    prefix="£"
                                    suffix=" per hour"
                                    defaultValue={1000}
                                    decimalsLimit={2}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onValueChange={(value) => value ? setPrice(value) : ""}
                                />
                            </div>
                            <InputTextField
                                label="Your covered areas"
                                type="text"
                                placeholder="todo"
                                onChange={(value) => setArea(value)}
                            />

                            <InputTextField
                                label="Your time"
                                type="text"
                                placeholder="todo"
                                onChange={(value) => setTime(value)}
                            />

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows={3}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Confirm
                            </button>


                            {/*<div*/}
                            {/*    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">*/}
                            {/*    <p*/}
                            {/*        className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">*/}
                            {/*        OR*/}
                            {/*    </p>*/}
                            {/*</div>*/}


                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default ServiceCreatorPage;

