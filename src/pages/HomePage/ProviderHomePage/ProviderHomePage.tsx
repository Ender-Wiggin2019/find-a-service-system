import React, { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'

import { useAuthState, useRegister } from '~/utils/hooks/UserContext'
import InputTextField from '~/components/InputText/InputTextField'
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import { db, storage } from '~/services/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useServiceCreator } from '~/utils/hooks/UseServiceCreator'

import { FirebasePath } from '~/services/lib/constants'
import ProviderServiceCard from '~/components/Card/ProviderServiceCard'
import { IService, ServiceCreator } from '~/services/types/service'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { Service } from '~/services/types/service'
import { ServiceProvider } from '~/services/types/user'
import Page from '~/components/Page/Page'

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
                const serviceCollection = collection(db, FirebasePath.SERVICE)
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
                    <ProviderServiceCard key={index} service={service} />
                ))}
            </div>
        </Page>
    )
}

export default ProviderHomePage
