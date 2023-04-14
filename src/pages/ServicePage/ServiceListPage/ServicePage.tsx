import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import ServiceCard from '~/components/Card/CustomerServiceCard'
import { Service, IService } from '~/services/types/service'
import { ServiceProvider } from '~/services/types/user'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import Page from '~/components/Page/Page'
const ServicePage: React.FC = () => {
    const [services, setServices] = useState<IService[]>([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('coverArea')

    useEffect(() => {
        const fetchServices = async () => {
            const serviceCollection = collection(db, FirebasePath.SERVICE)
            const serviceSnapshot = await getDocs(serviceCollection)
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
                            serviceProviderData.isVerified,
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

        fetchServices()
    }, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
    }

    return (
        <Page>
            <h2 className='text-2xl font-bold mb-4'>Services</h2>
            <div className='flex mb-4'>
                <input
                    type='text'
                    value={search}
                    onChange={handleSearchChange}
                    className='border rounded w-full p-2'
                    placeholder='Search services...'
                />
                <select
                    title='select'
                    value={filter}
                    onChange={handleFilterChange}
                    className='border rounded w-1/4 p-2 ml-4'
                >
                    <option value='coverArea'>Cover Area</option>
                    <option value='time'>Time</option>
                </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 justify-items-stretch'>
                {services.map((service, index) => (
                    <Link key={index} to={`/service/${service.id}`}>
                        <ServiceCard service={service} />
                    </Link>
                ))}
            </div>
        </Page>
    )
}

export default ServicePage