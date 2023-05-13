import React, { useEffect, useState, ChangeEvent } from 'react'
// import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, deleteDoc, updateDoc } from 'firebase/firestore'
import CommentCard from '~/components/Card/CommentCard'
import { Service, Comment, IComment } from '~/services/types/service'
import { ServiceProvider } from '~/services/types/user'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import GoogleMapReact from "google-map-react";

type MapCardProps = {
    serviceId: string
}

const MapCard: React.FC<MapCardProps> = ({ serviceId }) => {
    const [provider_name, setName] = useState("")
    const [latitude, setLat] = useState(50.9377101)
    const [longitude, setLng] = useState(-1.3766856)
    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonClick = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };


    const defaultProps = {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 13
    };

    const AnyReactComponent = ({ lat, lng, text }: { lat: number, lng: number, text: string }) => (

        <div style={{
            color: 'white',
            background: 'red',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            {text}
        </div>
    );

    // console.log(comments);

    useEffect(() => {
        const fetchMap = async () => {
            const commentsData = {name:"", lat:0, lng:0}
            const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, serviceId));
            const serviceData = serviceDoc.data();
            console.log(serviceData);

            if (serviceData)
            {
                const serviceProviderDoc = await getDoc(doc(db, "serviceProvider", serviceData.uid));
                const serviceProviderData = serviceProviderDoc.data();

                console.log(serviceProviderData);
                if (serviceProviderData) {

                    commentsData.name = serviceData.name;
                    commentsData.lat = serviceProviderData.latitude;
                    commentsData.lng = serviceProviderData.longitude;
                    console.log(commentsData.name);
                }

            }
            setName(commentsData.name);
            setLat(commentsData.lat);
            setLng(commentsData.lng);
        }

        fetchMap()
    }, [])

    return (
        <div>
            <label
                htmlFor='my-modal-map'
                className='flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-button rounded-lg  hover:bg-button focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
            >
                See location
            </label>

            <input type='checkbox' id='my-modal-map' className='modal-toggle' />
            <div className='modal modal-middle'>
                <div className='modal-box'>
                    <label htmlFor='my-modal-map' className='btn btn-sm btn-circle absolute right-2 top-2'>
                        ✕
                    </label>
                    <div><br></br></div>
                    <div style={{ height: '50vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDhczFRE73TpmtpletCMqSg-A8TZLq4npI" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            <AnyReactComponent
                                lat={latitude}
                                lng={longitude}
                                text={provider_name}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapCard
