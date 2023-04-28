import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthState, useRegister } from '~/utils/hooks/UserContext'
import InputTextField from '~/components/InputText/InputTextField'
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import { storage } from '~/services/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useServiceCreator } from '~/utils/hooks/UseServiceCreator'

import { SERVICE_PROVIDER_IMAGE_PATH } from '~/services/lib/constants'
import ProviderServiceCard from '~/components/Card/ProviderServiceCard'
import CommentCreator from '~/components/Creator/CommentCreator'
import CommentsList from '~/pages/ServicePage/ServiceDetailPage/Comments/CommentsListPage'
import RequestHistoryPage from '~/pages/RequestPage/RequestServicePage/RequestHistoryPage'
import { ServiceStatus } from '~/services/types/request'
import Page from '~/components/Page/Page'

const CustomerHomePage: React.FC = () => {
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

    const toggleServiceHistory = () => {
        const x = document.getElementById('requestHistory')
        if (x) {
            if (x.style.display === 'none') {
                x.style.display = 'block'
            } else {
                x.style.display = 'none'
            }
        }
    }

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
                    // TODO: if failed, delete image
                })
                .then(() => {
                    // TODO: should execute something and jump to another page
                    // navigate("/");
                })
        }
    }

    return (
        <Page>
            <h2 className='text-2xl font-bold mb-4 text-center'>
                Welcome {state.state === 'SIGNED_IN' && <>{state.currentUser.displayName}</>}{' '}
            </h2>
            <div className='flex mb-4'>
                <button
                    className='flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-button rounded-lg  hover:bg-button focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
                    onClick={() => (window.location.href = '/services')}
                >
                    Search New Services
                </button>
            </div>

            <div className='flex mb-4'>
                <button
                    className='flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-button rounded-lg  hover:bg-button focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
                    onClick={() => toggleServiceHistory()}
                >
                    View Service History
                </button>
            </div>

            <div id='requestHistory' style={{ display: 'none' }}>
                <RequestHistoryPage />
            </div>
        </Page>
    )
}

export default CustomerHomePage
