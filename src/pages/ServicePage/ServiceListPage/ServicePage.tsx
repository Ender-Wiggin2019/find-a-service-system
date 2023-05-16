import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import ServiceCard from '~/components/Card/CustomerServiceCard'
import { Service, IService, ServiceCategory } from '~/services/types/service'
import { ServiceProvider } from '~/services/types/user'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import Page from '~/components/Page/Page'
import InputEnumField from '~/components/InputText/InputEnumField'
import InputGeoField from '~/components/InputText/InputGeoField'
import InputTextField from '~/components/InputText/InputTextField'
import SearchIcon from '@mui/icons-material/Search'
import CategoryIcon from '@mui/icons-material/Category'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const ServicePage: React.FC = () => {
    const [services, setServices] = useState<IService[]>([])

    // search and filter
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [coverAreaFilter, setCoverAreaFilter] = useState('')
    const [filteredServices, setFilteredServices] = useState<IService[]>([])

    const handleResetFilters = () => {
        setSearch('')
        setCategoryFilter('')
        setCoverAreaFilter('')
    }

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
                            serviceProviderData.status,
                            serviceProviderData.rejectReason,
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
                                data.category,
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

    useEffect(() => {
        let filtered = services

        console.log(filtered.length)

        if (search !== '') {
            filtered = filtered.filter((service) => service.service.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (categoryFilter !== '') {
            filtered = filtered.filter((service) => service.service.category === categoryFilter)
        }

        if (coverAreaFilter !== '') {
            filtered = filtered.filter((service) => service.service.coverArea.includes(coverAreaFilter))
        }

        setFilteredServices(filtered)
    }, [services, search, categoryFilter, coverAreaFilter])

    return (
        <Page>
            <h2 className='text-2xl font-bold mb-4'>Services</h2>
            <div className='flex flex-col md:flex-row justify-between mb-4 gap-4'>
                <div className='w-full md:basic-1/2 flex items-center'>
                    <SearchIcon className='mb-4' />
                    <div className='w-full'>
                        <InputTextField
                            label=''
                            value={search}
                            type='text'
                            placeholder='Search services...'
                            onChange={setSearch}
                        />
                    </div>
                </div>
                <div className='w-full md:basic-1/2 flex items-center'>
                    <div className='w-1/2 md:basic-1/4 flex items-center space-x-2'>
                        <CategoryIcon className='mb-4' />
                        <div className='w-full'>
                            <InputEnumField
                                label=''
                                placeholder='Category'
                                onChange={(selectedOption) => {
                                    const firstOption = selectedOption?.value || '' // TODO: should be an array
                                    setCategoryFilter(firstOption)
                                }}
                                enumType={Object.entries(ServiceCategory).reduce((obj, [key, value]) => {
                                    obj[value] = value
                                    return obj
                                }, {} as Record<string, string>)}
                            />
                        </div>
                    </div>
                    <div className='w-1/2 md:basic-1/4 flex items-center space-x-2'>
                        <FmdGoodIcon className='mb-4' />
                        <div className='w-full'>
                            <InputGeoField
                                label=''
                                placeholder='Cover Area'
                                onChange={(selectedOptions) => {
                                    const firstOption = selectedOptions[0]?.value || '' // TODO: should be an array
                                    console.log(firstOption)
                                    setCoverAreaFilter(firstOption)
                                }}
                            />
                        </div>
                    </div>
                    <button
                        title='Reset Filters'
                        className='bg-tertiary text-card rounded flex items-center h-9 mb-4 ml-1 px-2.5'
                        onClick={handleResetFilters}
                    >
                        <RestartAltIcon className='w-4 h-2' />
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 justify-items-stretch'>
                {filteredServices.map((service, index) => (
                    <Link key={index} to={`/service/${service.id}`}>
                        <ServiceCard service={service} />
                    </Link>
                ))}
            </div>
        </Page>
    )
}

export default ServicePage
