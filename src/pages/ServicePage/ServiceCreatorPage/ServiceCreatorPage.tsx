import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthState } from '~/utils/hooks/UserContext'
import ImageUploader from '~/utils/ImageUploader'
import InputTextField from '~/components/InputText/InputTextField'
import InputCurrencyField from '~/components/InputText/InputCurrencyField'
import InputGeoField from '~/components/InputText/InputGeoField'
import InputEnumField from '~/components/InputText/InputEnumField'
import { ServiceCategory, ServiceAvailableTime } from '~/services/types/service'
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import { storage } from '~/services/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useServiceCreator } from '~/utils/hooks/UseServiceCreator'

import { SERVICE_PROVIDER_IMAGE_PATH } from '~/services/lib/constants'

const ServiceCreatorPage: React.FC = () => {
    const { state } = useAuthState()

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [area, setArea] = useState('')
    const [price, setPrice] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')

    const [imageUpload, setImageUpload] = useState<File>() // TODO: for now only assume one service has only one image
    const [imageUrl, setImageUrl] = useState<string>() // url from firebase storage
    const imagesListRef = ref(storage, SERVICE_PROVIDER_IMAGE_PATH)

    const { serviceCreator } = useServiceCreator()
    const navigate = useNavigate()

    const handleImageSelected = useCallback((file: File) => {
        console.log('Image selected:', file)
        setImageUpload(file)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN') {
            if (imageUpload === undefined) return
            // upload image to firebase storage
            const imageRef = ref(storage, `${SERVICE_PROVIDER_IMAGE_PATH + imageUpload.name + uuidv4()}`)
            uploadBytes(imageRef, imageUpload)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        // setImageUrls((prev) => [...prev, url]);
                        setImageUrl(url)
                    })
                    console.log(imageUrl)
                })
                .then(() => {
                    // write back to firestore
                    if (imageUrl === undefined) return
                    serviceCreator(state.currentUser.uid, name, imageUrl, price, area, time, description, category)
                    console.log('success')
                    navigate('/provider-home')
                    // TODO: if failed, delete image
                })
                .then(() => {
                    // TODO: should execute something and jump to another page
                    // navigate("/provider-home");
                })
        }
    }

    return (
        <section className='h-screen'>
            <div className='container h-full px-6 py-24'>
                <h2 className='text-2xl font-bold mb-4'>
                    Welcome{' '}
                    {state.state === 'SIGNED_IN' && (
                        <div>
                            <h2 className='text-2xl font-bold mb-4'>{state.currentUser.displayName}</h2>
                        </div>
                    )}
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
                                onChange={(value) => setName(value)}
                            />
                            <InputEnumField
                                label='Your service category'
                                placeholder='Select or type...'
                                onChange={(selectedOption) => {
                                    const firstOption = selectedOption?.value || '' // TODO: should be an array
                                    setCategory(firstOption)
                                }}
                                enumType={Object.entries(ServiceCategory).reduce((obj, [key, value]) => {
                                    obj[value] = value
                                    return obj
                                }, {} as Record<string, string>)}
                            />
                            <ImageUploader onImageSelected={handleImageSelected} />
                            <InputCurrencyField
                                label='Your service price'
                                type='text'
                                onChange={(value) => setPrice(value)}
                            />
                            {/*<InputTextField*/}
                            {/*    label='Your covered areas'*/}
                            {/*    type='text'*/}
                            {/*    placeholder='todo'*/}
                            {/*    onChange={(value) => setArea(value)}*/}
                            {/*/>*/}
                            <InputGeoField
                                label='Your covered areas'
                                placeholder='Select covered areas...'
                                onChange={(selectedOptions) => {
                                    const firstOption = selectedOptions[0]?.value || '' // TODO: should be an array
                                    console.log(firstOption)
                                    setArea(firstOption)
                                }}
                            />

                            <InputEnumField
                                label='Your available time'
                                placeholder='Select or type...'
                                onChange={(selectedOption) => {
                                    const firstOption = selectedOption?.value || '' // TODO: should be an array
                                    setTime(firstOption)
                                }}
                                enumType={Object.entries(ServiceAvailableTime).reduce((obj, [key, value]) => {
                                    obj[value] = value // TODO: what about key?
                                    return obj
                                }, {} as Record<string, string>)}
                            />

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

                            <button
                                type='submit'
                                className='w-full text-white bg-button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-button dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                data-te-ripple-init
                                data-te-ripple-color='light'
                            >
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceCreatorPage
