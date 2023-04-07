import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, updateProfile, sendEmailVerification } from 'firebase/auth'

import { useAuthState } from '~/components/auth/UserContext'
import InputTextField from '../shared/InputTextField'

const UserSettingPage: React.FC = () => {
    const { state } = useAuthState()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [sendVerification, setSendVerification] = useState(false)
    // const [address, setAddress] = useState("");
    // const [description, setDescription] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        if (state.state === 'SIGNED_IN' && state.currentUser) {
            setEmail(state.currentUser.email || '')
            setName(state.currentUser.displayName || '')
            // setAddress(state.currentUser.email || "");
        }
    }, [state])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN') {
            await sendEmailVerification(state.currentUser)
            setSendVerification(true)
            console.log('success')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN') {
            // Call updateUserProfile function to update user profile
            await updateProfile(state.currentUser, {
                displayName: name,
                photoURL: 'https://example.com/jane-q-user/profile.jpg',
            })

            navigate(0)
        }
    }

    return (
        <div className='container h-full px-6 py-12'>
            {state.state === 'SIGNED_IN' &&
                state.currentUser &&
                !state.currentUser.emailVerified &&
                !sendVerification && (
                    <div className='alert alert-warning'>
                        <div>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='stroke-current flex-shrink-0 h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                                />
                            </svg>
                            <span>Warning: Email not verified!</span>
                        </div>
                    </div>
                )}
            {state.state === 'SIGNED_IN' &&
                state.currentUser &&
                !state.currentUser.emailVerified &&
                sendVerification && (
                    <div className='alert alert-success'>
                        <div>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='stroke-current flex-shrink-0 h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                            <span>Verification Email has Sent!</span>
                        </div>
                    </div>
                )}
            {state.state === 'SIGNED_IN' && state.currentUser && state.currentUser.emailVerified && (
                <div className='alert alert-success'>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='stroke-current flex-shrink-0 h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span>Email has Verified!</span>
                    </div>
                </div>
            )}
            <form className='mt-2' onSubmit={handleSubmit}>
                <InputTextField
                    disabled={true}
                    label='Your email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(value) => setEmail(value)}
                />
                {state.state === 'SIGNED_IN' && state.currentUser && !state.currentUser.emailVerified && (
                    <button
                        onClick={(e) => handleVerify(e)}
                        className='w-20 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mb-4 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                        data-te-ripple-color='light'
                    >
                        Verify
                    </button>
                )}

                <InputTextField
                    label='Your name'
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(value) => setName(value)}
                />
                {/*<InputTextField*/}
                {/*    label="Your Address"*/}
                {/*    type="text"*/}
                {/*    placeholder="Address"*/}
                {/*    value={address}*/}
                {/*    onChange={(value) => setAddress(value)}*/}
                {/*/>*/}
                {/*<div className="mb-4">*/}
                {/*    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>*/}
                {/*    <textarea*/}
                {/*        value={description}*/}
                {/*        onChange={(e) => setDescription(e.target.value)}*/}
                {/*        className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
                {/*        rows={3}*/}
                {/*    ></textarea>*/}
                {/*</div>*/}

                <button
                    type='submit'
                    className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                    data-te-ripple-color='light'
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UserSettingPage
