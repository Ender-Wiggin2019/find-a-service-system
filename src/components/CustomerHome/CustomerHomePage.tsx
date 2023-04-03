import React, { useState, useCallback } from "react";
import {Link, useNavigate} from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';

import {useAuthState} from "~/components/auth/UserContext";
import InputTextField from "../shared/InputTextField";
import {getDownloadURL, ref, uploadBytes, listAll} from "firebase/storage";
import {storage} from "~/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useServiceCreator } from "~/components/serviceCreator/UseServiceCreator";

import {SERVICE_PROVIDER_IMAGE_PATH} from "~/lib/constants";
import ServiceCard from "~/components/services/Service";

const CustomerHomePage: React.FC = () => {
    const { state } = useAuthState();

    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [price, setPrice] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");

    const [imageUpload, setImageUpload] = useState<File>(); // TODO: for now only assume one service has only one image
    const [imageUrl, setImageUrl] = useState<string>(); // url from firebase storage
    const imagesListRef = ref(storage, SERVICE_PROVIDER_IMAGE_PATH);

    const { serviceCreator } = useServiceCreator();
    const navigate = useNavigate();

    const handleImageSelected = useCallback((file: File) => {
        console.log("Image selected:", file);
        setImageUpload(file);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (state.state === "SIGNED_IN") {
            if (imageUpload === undefined) return;
            // upload image to firebase storage
            const imageRef = ref(storage, `${SERVICE_PROVIDER_IMAGE_PATH+imageUpload.name + uuidv4()}`);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    // setImageUrls((prev) => [...prev, url]);
                    setImageUrl(url);
                });
                console.log(imageUrl);
            }).then(() => {
                // write back to firestore
                if (imageUrl === undefined) return;
                serviceCreator(state.currentUser.uid, name, imageUrl, price, area, time, description);
                // TODO: if failed, delete image
            }).then(() => {
                // TODO: should execute something and jump to another page
                // navigate("/");
            });

        }
    };

    return (
        <div className="container h-full px-6 py-12">
            <h2 className="text-2xl font-bold mb-4">Welcome {name}</h2>
            <div className="flex mb-4">
                <button
                    className="flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg  hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                    onClick={() => window.location.href = '/services'}>
                    Search Services
                </button>
            </div>
            <div className="flex mb-4">
                <button
                    className="flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg  hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                    >
                    Service History
                </button>
            </div>
        </div>
    )
};


export default CustomerHomePage;

