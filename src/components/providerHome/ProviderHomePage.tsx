import React, {useState, useCallback, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'

import { useAuthState, useRegister } from '~/components/auth/UserContext'
import InputTextField from '../shared/InputTextField'
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import {db, storage} from '~/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useServiceCreator } from '~/components/serviceCreator/UseServiceCreator'

import {SERVICE_FIRESTORE_PATH} from '~/lib/constants'
import ServiceCard from './ServiceCard'
import {IService, ServiceCreator} from '~/components/types/service'
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {Service} from "~/components/types/service";
import {ServiceProvider} from "~/components/types/user";
import Page from '~/components/shared/Page'

const ProviderHomePage: React.FC = () => {
    const { state } = useAuthState()

    const [name, setName] = useState('')
    const [services, setServices] = useState<Array<IService>>([])

    const { serviceCreator } = useServiceCreator()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchServices = async () => {
            console.log(state.state)
            if (state.state === 'SIGNED_IN') {
                console.log(state.currentUser.uid)
                const serviceCollection = collection(db, SERVICE_FIRESTORE_PATH)
                const q = query(serviceCollection, where('uid', '==', state.currentUser.uid))
                const serviceSnapshot = await getDocs(q)
                const servicesData: IService[] = []

                await Promise.all(
                    serviceSnapshot.docs.map(async (singleDoc) => {
                        const data = singleDoc.data()
                        // console.log(data);
                        const serviceProviderDoc = await getDoc(doc(db, 'serviceProvider', data.uid))
                        const serviceProviderData = serviceProviderDoc.data()
                        console.log(serviceProviderData)

                        if (serviceProviderData) {
                            const serviceProvider = new ServiceProvider(
                                data.uid,
                                serviceProviderData.name,
                                serviceProviderData.email,
                                serviceProviderData.address,
                                serviceProviderData.description,
                                serviceProviderData.isVerified || false,
                            )

                            servicesData.push({
                                service: new Service(
                                    data.uid,
                                    data.name,
                                    data.image,
                                    data.price,
                                    data.coverArea,
                                    data.time,
                                    data.description,
                                    data.isVerified,
                                ),
                                id: singleDoc.id,
                                serviceProvider: serviceProvider,
                            })
                        }
                    }),
                )
                setServices(servicesData)
            }

            }

            fetchServices()
    }, [state])

    return (
        <Page>
            <h2 className='text-2xl font-bold mb-4'>Services</h2>
            <div className='service-cards grid grid-cols-1 gap-4'>
                {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                ))}
            </div>
        </Page>
    )
}

export default ProviderHomePage
