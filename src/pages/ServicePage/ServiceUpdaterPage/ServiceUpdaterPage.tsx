import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthState } from '~/utils/hooks/UserContext'
import { useServiceNotifications } from '~/utils/hooks/UseServiceNotifications'
import ImageUploader from '~/utils/ImageUploader'
import InputTextField from '~/components/InputText/InputTextField'
import InputCurrencyField from '~/components/InputText/InputCurrencyField'
import InputGeoField from '~/components/InputText/InputGeoField'
import InputEnumField from '~/components/InputText/InputEnumField'
import { ServiceCategory, ServiceAvailableTime, Service, IService } from '~/services/types/service'
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import { db, storage } from '~/services/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useServiceCreator } from '~/utils/hooks/UseServiceCreator'

import { FirebasePath, SERVICE_PROVIDER_IMAGE_PATH } from '~/services/lib/constants'
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { createNewServiceMessage, updateServiceMessage } from '~/services/types/message'

const ServiceUpdaterPage: React.FC = () => {
    const { state } = useAuthState()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [area, setArea] = useState('')
    const [price, setPrice] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')

    const [imageUpload, setImageUpload] = useState<File>() // TODO: for now only assume one service has only one image
    const [imageUrl, setImageUrl] = useState<string>()
    const [service, setService] = useState<Service | null>(null)
    const { serviceId } = useParams<{ serviceId: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) return
            const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, serviceId))
            if (serviceDoc.exists()) {
                const data = serviceDoc.data() as Service
                setService(data)
                setName(data.name)
                setCategory(data.category)
                setArea(data.coverArea)
                setPrice(data.price)
                setTime(data.time)
                setDescription(data.description)
                setImageUrl(data.image)
            }
        }

        fetchService()
    }, [serviceId])

    const handleImageSelected = useCallback((file: File) => {
        console.log('Image selected:', file)
        setImageUpload(file)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN' && service != null) {
            // ... rest of your code here ...

            // updating service
            const updatedService: Service = new Service(
                service.uid,
                name,
                imageUrl || service.image,
                price,
                area,
                time,
                description,
                service.isVerified,
                category,
                service.comments,
            )
            try {
                const serviceDocRef = doc(db, FirebasePath.SERVICE, serviceId || '')
                await updateDoc(serviceDocRef, JSON.parse(JSON.stringify(updatedService)))
                console.log('Service updated successfully')

                const requestsCollection = collection(db, `request`)
                const q = query(requestsCollection, where('sid', '==', serviceId))
                const requestSnapshot = await getDocs(q)

                // Get unique uids
                const uidSet = new Set<string>()
                requestSnapshot.forEach((doc) => {
                    uidSet.add(doc.data().uid)
                })

                const uniqueUids = Array.from(uidSet)
                console.log(uniqueUids)
                // Create new service message
                const newMessage = updateServiceMessage(serviceId || '', updatedService.name)

                // Add new message to each user's notifications collection
                for (const uid of uniqueUids) {
                    const userNotificationsCollection = collection(db, `customer/${uid}/notification`)
                    await addDoc(userNotificationsCollection, newMessage)
                }

                navigate(`/service/${serviceId}`)
            } catch (error) {
                console.error('Failed to update service:', error)
            }
        }
    }

    return (
        <section className='h-screen'>
            <div className='container h-full px-6 py-24'>
                <h2 className='text-2xl font-bold mb-4'>
                    Welcome {state.state === 'SIGNED_IN' && <>{state.currentUser.displayName}</>}{' '}
                </h2>
                <div className='g-6 flex h-full flex-wrap items-center justify-center lg:justify-between'>
                    <div className='mb-12 md:mb-0 md:w-8/12 lg:w-6/12'>
                        <img
                            src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                            className='w-full'
                            alt='Phone image'
                        />
                    </div>
                    <div className='md:w-8/12 lg:ml-6 lg:w-5/12'>
                        <form onSubmit={handleSubmit}>
                            <InputTextField
                                label='Your service name'
                                type='text'
                                placeholder='Service Name'
                                value={name}
                                onChange={(value) => setName(value)}
                            />
                            <ImageUploader onImageSelected={handleImageSelected} />
                            <InputCurrencyField
                                label='Your service price'
                                type='text'
                                value={price}
                                onChange={(value) => setPrice(value)}
                            />
                            {/*<InputTextField*/}
                            {/*    label='Your covered areas'*/}
                            {/*    type='text'*/}
                            {/*    placeholder='todo'*/}
                            {/*    onChange={(value) => setArea(value)}*/}
                            {/*/>*/}

                            <div className='mb-4'>
                                <label className='block text-subhead text-sm font-bold mb-2'>Description</label>
                                <div className='p-2.5 py-2 mb-4 mt-2 bg-white rounded-sm border border-subhead dark:bg-subhead dark:border-subhead'>
                                    <textarea
                                        id='comment'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className='px-0 w-full text-sm text-head border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-subhead'
                                        placeholder='Write Request Description...'
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/*<InputGeoField*/}
                            {/*    label='Your covered areas'*/}
                            {/*    placeholder='Select covered areas...'*/}
                            {/*    onChange={(selectedOptions) => {*/}
                            {/*        const firstOption = selectedOptions[0]?.value || '' // TODO: should be an array*/}
                            {/*        console.log(firstOption)*/}
                            {/*        setArea(firstOption)*/}
                            {/*    }}*/}
                            {/*/>*/}

                            {/*<InputEnumField*/}
                            {/*    label='Your available time'*/}
                            {/*    placeholder='Select or type...'*/}
                            {/*    onChange={(selectedOption) => {*/}
                            {/*        const firstOption = selectedOption?.value || '' // TODO: should be an array*/}
                            {/*        setTime(firstOption)*/}
                            {/*    }}*/}
                            {/*    enumType={Object.entries(ServiceAvailableTime).reduce((obj, [key, value]) => {*/}
                            {/*        obj[value] = value // TODO: what about key?*/}
                            {/*        return obj*/}
                            {/*    }, {} as Record<string, string>)}*/}
                            {/*/>*/}
                            <button
                                type='submit'
                                className='w-full text-white bg-button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-button dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                data-te-ripple-color='light'
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceUpdaterPage
