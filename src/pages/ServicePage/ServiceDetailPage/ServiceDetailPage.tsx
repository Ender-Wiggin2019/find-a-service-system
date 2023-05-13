import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '~/services/lib/firebase'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import GoogleMapReact from 'google-map-react'
import LocationPin from 'google-map-react'
import { useMemo } from "react";
import './Map/map.css'

import { FirebasePath } from '~/services/lib/constants'
// import {ServiceProvider} from "~/components/types/user";
import { Service } from '~/services/types/service'
import CommentCreator from '~/components/Creator/CommentCreator'
import CommentsList from './Comments/CommentsListPage'
import MapCard from './Map/MapCard'
import RequestCreator from '~/components/Creator/RequestCreator'
import Page from '~/components/Page/Page'

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

const ServiceDetail: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>()
    const [service, setService] = useState<Service | null>(null)

    const defaultProps = {
        center: {
            lat: 50.9377101,
            lng: -1.3766856
        },
        zoom: 15
    };

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) return
            const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, serviceId))
            if (serviceDoc.exists()) {
                const data = serviceDoc.data() as Service
                setService(data)
            }
        }

        fetchService()
    }, [serviceId])

    if (!service) {
        return <div>Loading...</div>
    }

    return (
        <Page>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 relative shadow-xl'>
                    <img className='w-full h-screen object-cover' src={service.image} alt={service.name} />
                </div>
                <div className='w-full bg-white container flex flex-col items-center py-5 mx-auto  md:flex-row shadow-xl bg-base-100'>
                    <div className='flex flex-col items-start w-full pt-0 mb-16 text-left lg:flex-grow md:px-10 sm:px-5 md:mb-0'>
                        <h1 className='mb-8 text-2xl font-black tracking-tighter text-black  md:text-5xl title-font'>
                            {service.name}
                        </h1>

                        <h3 className='text-1xl md:text-3xl font-bold dark:text-white'>Price</h3>
                        <p className='mb-8 text-base leading-relaxed text-left text-blueGray-600'>
                            {'£' + service.price + ' per hour'}
                        </p>

                        <h3 className='text-1xl md:text-3xl font-bold dark:text-white'>Description</h3>
                        <p className='mb-8 text-base leading-relaxed text-justify text-blueGray-600'>
                            {service.description}
                        </p>

                        <h3 className='text-1xl md:text-3xl font-bold dark:text-white'>Cover Area</h3>
                        <p className='mb-8 text-base leading-relaxed text-left text-blueGray-600'>
                            {service.coverArea}
                        </p>

                        <h3 className='text-1xl md:text-3xl font-bold dark:text-white'>Available TIME</h3>
                        <p className='mb-8 text-base leading-relaxed text-left text-blueGray-600'>{service.time}</p>
                        <div className='flex flex-row w-full gap-2 md:justify-start md:flex-row'>
                            {serviceId && (
                                <>
                                    <div>
                                        <RequestCreator serviceId={serviceId} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDhczFRE73TpmtpletCMqSg-A8TZLq4npI" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={defaultProps.center.lat}
                        lng={defaultProps.center.lng}
                        text={service.name}
                    />
                </GoogleMapReact>
            </div>


            {serviceId && (
                <>
                    <div className='container grid grid-col-1 items-center px-5 py-2 mx-auto my-5 md:flex-row lg:px-28 shadow-xl bg-base-100'>
                        <div>Comment</div>
                        <div className='w-full'>
                            <CommentsList serviceId={serviceId} />
                        </div>
                    </div>
                </>
            )}

            {serviceId && (
                <>
                    <MapCard serviceId={serviceId} />
                </>
            )}
        </Page>
    )
}

export default ServiceDetail