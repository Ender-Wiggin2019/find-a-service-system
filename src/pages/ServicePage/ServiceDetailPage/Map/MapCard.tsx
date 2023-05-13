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


    const defaultProps = {
        center: {
            lat: 50.9377101,
            lng: -1.3766856
        },
        zoom: 15
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
            const serviceCollection = collection(db, FirebasePath.SERVICE, serviceId, FirebasePath.COMMENT)
            const commentSnapshot = await getDocs(serviceCollection)
            const commentsData = {name:"", lat:0, lng:0}

            await Promise.all(
                commentSnapshot.docs.map(async (singleDoc) => {
                    const data = singleDoc.data()
                     console.log(data);
                     const serviceProviderDoc = await getDoc(doc(db, "serviceProvider", data.uid));
                     const serviceProviderData = serviceProviderDoc.data();
                     console.log(serviceProviderData);
                     commentsData.name = data.name;
                     if (serviceProviderData) {
                        commentsData.lat = serviceProviderData.lat;
                        commentsData.lng = serviceProviderData.lng;
                     }
                }),
            )

            setName(commentsData.name);
            setLat(commentsData.lat);
            setLng(commentsData.lng);
        }

        fetchMap()
    }, [])

    return (
        <div style={{ height: '100vh', width: '100%' }}>
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
    )
}

export default MapCard
