import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '~/services/lib/firebase'
import LocationPin from 'google-map-react'
import { useMemo } from 'react'
import './Map/map.css'

import { FirebasePath } from '~/services/lib/constants'
// import {ServiceProvider} from "~/components/types/user";
import { Service } from '~/services/types/service'
import CommentCreator from '~/components/Creator/CommentCreator'
import CommentsList from './Comments/CommentsListPage'
import MapCard from './Map/MapCard'
import RequestCreator from '~/components/Creator/RequestCreator'
import Page from '~/components/Page/Page'
import {useAuthState} from "~/utils/hooks/UserContext";

const ServiceDetail: React.FC = () => {
    const { state } = useAuthState()
    const { serviceId } = useParams<{ serviceId: string }>()
    const [service, setService] = useState<Service | null>(null)

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
            <div className='container flex flex-col md:flex-row rounded-xl '>
                <div className='w-full md:w-1/2 relative shadow-xl rounded-xl'>
                    <img className='h-full object-cover rounded-t-xl md:rounded-l-xl' src={service.image} alt={service.name} />
                </div>
                <div className='w-full bg-white container flex flex-col rounded-b-xl md:rounded-r-xl items-center py-5 mx-auto  md:flex-row shadow-xl bg-base-100'>
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
                            {serviceId && state.userType === 'customer' && (
                                <>
                                    <div>
                                        <RequestCreator serviceId={serviceId} />
                                    </div>
                                </>
                            )}
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className='flex flex-row w-full gap-2 md:justify-start md:flex-row'>
                            {serviceId && (
                                <>
                                    <div>
                                        <MapCard serviceId={serviceId} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {serviceId && (
                <>
                    <div className='container grid grid-col-1 items-center rounded-xl px-5 py-2 mx-auto my-5 md:flex-row lg:px-28 shadow-xl bg-base-100'>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
                        </div>
                        <div className='w-full'>
                            <CommentsList serviceId={serviceId} />
                        </div>
                    </div>
                </>
            )}
        </Page>
    )
}

export default ServiceDetail
