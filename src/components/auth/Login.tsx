import React, { useState } from 'react'
import InputTextField from '../shared/InputTextField'
import { useSignIn, useGoogleSignIn } from './UserContext'
import { useNavigate } from 'react-router-dom'
const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState('') // TODO: implement remember me

    const { signIn } = useSignIn()
    const { signInWithGoogle } = useGoogleSignIn()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await signIn(email, password)
        navigate('/service-creator') // TODO: test only
    }

    return (
        <section className='h-screen'>
            <div className='container h-full px-6 py-24'>
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
                                placeholder='Email address'
                                onChange={(value) => setEmail(value)}
                            />
                            <InputTextField
                                label='Your password'
                                type='password'
                                placeholder='Password'
                                onChange={(value) => setPassword(value)}
                            />

                            <div className='flex items-center justify-between'>
                                <div className='flex items-start'>
                                    <div className='flex items-center h-5'>
                                        <input
                                            id='remember'
                                            aria-describedby='remember'
                                            type='checkbox'
                                            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-subhead dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-subhead'
                                            // required=""
                                            onChange={(e) => setRemember(e.target.value)}
                                        />
                                    </div>
                                    <div className='ml-3 text-sm'>
                                        <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href='~/components/auth/LoginRegisterForm#'
                                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type='submit'
                                className='w-full text-white bg-button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-button dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                data-te-ripple-init
                                data-te-ripple-color='light'
                            >
                                Sign in
                            </button>

                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Don’t have an account yet?{' '}
                                <a
                                    href='/register'
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                >
                                    Sign up
                                </a>
                            </p>

                            <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
                                <p className='mx-4 mb-0 text-center font-semibold dark:text-neutral-200'>OR</p>
                            </div>

                            <button
                                onClick={signInWithGoogle}
                                className='mb-3 flex w-full items-center justify-center rounded bg-info px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]'
                                style={{ backgroundColor: '#9cc4ee' }}
                                role='button'
                                data-te-ripple-color='light'
                            >
                                {/*<svg*/}
                                {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                {/*    className="mr-2 h-3.5 w-3.5"*/}
                                {/*    fill="currentColor"*/}
                                {/*    viewBox="0 0 24 24">*/}
                                {/*    <defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible"/></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>*/}
                                {/*</svg>*/}
                                <img
                                    className='mr-5 h-3.5 w-3.5'
                                    src='https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg'
                                    alt='google'
                                />
                                Continue with Google
                            </button>
                            <button
                                onClick={signInWithGoogle}
                                className='mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-button hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-button focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
                                style={{ backgroundColor: '#3b5998' }}
                                role='button'
                                data-te-ripple-color='light'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='mr-2 h-3.5 w-3.5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                                </svg>
                                Continue with Facebook
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
