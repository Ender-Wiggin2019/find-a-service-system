import React, { useEffect, useState } from 'react'
import { useAuthState } from '~/utils/hooks/UserContext'
import InputTextField from '~/components/InputText/InputTextField'
import { Role } from '~/services/types/user'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { FirebasePath } from '~/services/lib/constants'
import { db } from '~/services/lib/firebase'

const WaitForVerifyPage: React.FC = () => {
    const { state } = useAuthState()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [rejectReason, setRejectReason] = useState('')

    useEffect(() => {
        if (state.state === 'SIGNED_IN' && state.userType === 'nonVerifiedProvider') {
            getDoc(doc(db, FirebasePath.SERVICE_PROVIDER, state.currentUser.uid)).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data()
                    if (data) {
                        setEmail(data.email)
                        setName(data.displayName)
                        setAddress(data.address)
                        setDescription(data.description)
                        setRejectReason(data.rejectReason)
                    }
                }
            })
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (state.state === 'SIGNED_IN' && state.userType === 'nonVerifiedProvider') {
            await setDoc(
                doc(db, FirebasePath.SERVICE_PROVIDER, state.currentUser.uid),
                {
                    displayName: name,
                    address: address,
                    description: description,
                    status: 'need to verify',
                },
                { merge: true },
            )
            alert('Your profile has been updated. Please wait for admin to verify your profile.')
        }
    }

    const step = 2

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='col-span-1 md:col-span-3'>
                <div className='relative pt-10'>
                    <div className='flex items-center justify-between'>
                        <span className='text-base font-semibold inline-block py-1 px-2 uppercase text-blue-600 bg-blue-300 w-1/3 text-center'>
                            Register
                        </span>
                        <span className='text-base font-semibold inline-block py-1 px-2 uppercase text-blue-100 bg-blue-500 w-1/3 text-center hover:bg-blue-700'>
                            Verification Pending
                        </span>
                        <span className='text-base font-semibold inline-block py-1 px-2 uppercase text-blue-600 bg-blue-300 w-1/3 text-center'>
                            Success
                        </span>
                    </div>
                    <div className='overflow-hidden h-1 mb-4 text-xs flex rounded bg-transparent'>
                        <div className='shadow-none flex flex-col text-center justify-center bg-transparent w-1/3'></div>
                        <div className='shadow-none flex flex-col text-center justify-center bg-blue-300 w-1/3'></div>
                        <div className='shadow-none flex flex-col text-center justify-center bg-transparent w-1/3'></div>
                    </div>
                </div>
            </div>
            <div className='col-span-1 md:col-span-3'>
                <section className='h-screen'>
                    {rejectReason && (
                        <div className='flex items-center justify-center'>
                            <div className='text-base font-semibold inline-block py-1 px-2 rounded-lg text-red-500 bg-red-200'>
                                <div>You have been rejected by admin. Please modify your profile and submit again.</div>
                                <div>
                                    Reject reason:
                                    <b> {rejectReason}</b>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='container h-full px-6 py-20'>
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
                                        label='Your email'
                                        type='email'
                                        value={email}
                                        placeholder='Email address'
                                        disabled={true}
                                        onChange={(value) => setEmail(value)}
                                    />
                                    <InputTextField
                                        label='Your name'
                                        type='text'
                                        value={name}
                                        placeholder='Name'
                                        onChange={(value) => setName(value)}
                                    />

                                    <InputTextField
                                        label='Your Address'
                                        type='text'
                                        value={address}
                                        placeholder='Address'
                                        onChange={(value) => setAddress(value)}
                                    />
                                    <label className='block text-subhead text-sm font-bold mb-2'>
                                        Your Description
                                    </label>
                                    <div className='p-2.5 py-2 mb-4 mt-2 bg-white rounded-sm border border-subhead dark:bg-subhead dark:border-subhead'>
                                        <textarea
                                            id='comment'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            className='px-0 w-full text-sm text-head border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-subhead'
                                            placeholder='Write Description...'
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type='submit'
                                        className='w-full text-white bg-button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-button dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                        data-te-ripple-color='light'
                                    >
                                        Modify your profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default WaitForVerifyPage
