import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordChecklist from 'react-password-checklist'
import { useRegister, useGoogleSignIn } from '~/utils/hooks/UserContext'
import InputTextField from '~/components/InputText/InputTextField'
import { Role } from '~/services/types/user'
import { Grid } from '@mui/material'
import Geocode from 'react-geocode'

Geocode.setApiKey('AIzaSyDhczFRE73TpmtpletCMqSg-A8TZLq4npI')
Geocode.setLanguage('en')
//Geocode.setRegion("es");
Geocode.setLocationType('ROOFTOP')
// Enable or disable logs. Its optional.
Geocode.enableDebug()

const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [address] = useState('')
    const [address_part_1, setAddressPart1] = useState('')
    const [address_part_2, setAddressPart2] = useState('')
    const [address_part_3, setAddressPart3] = useState('')
    const [address_part_4, setAddressPart4] = useState('')
    const [description, setDescription] = useState('')
    const [selectedRole, setSelectedRole] = useState<Role>('customer')

    const navigate = useNavigate()
    const { register } = useRegister()
    const { signInWithGoogle } = useGoogleSignIn()

    const geocodeAddress = async (address: string) => {
        try {
            const response = await Geocode.fromAddress(address)
            // Handle the result here
            console.log(response)
            // Extract latitude and longitude from the result
            const latlng = response.results[0].geometry.location
            console.log(response.results[0].geometry.location)
            console.log('Latitude:', latlng.lat)
            console.log('Longitude:', latlng.lng)
            // Return latitude and longitude as an object
            return { latitude: latlng.lat, longitude: latlng.lng }
        } catch (error) {
            // Handle any errors that occur during geocoding
            console.error(error)
            // Return undefined or an appropriate error value
            return { latitude: 0, longitude: 0 }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordValid) {
            const address = address_part_1 + ', ' + address_part_2 + ', ' + address_part_3 + ', ' + address_part_4

            const latlng = { lat: 0, lng: 0 }

            /*
            Geocode.fromAddress(address).then(
                (response) => {
                    latlng = response.results[0].geometry.location;
                    //lat =  response.results[0].geometry.location.lat();
                    //lng =  response.results[0].geometry.location.lng();
                    console.log("----")
                    console.log(latlng.lat, latlng.lng);
                    console.log("----")
                },
                (error) => {
                    console.error(error);
                }
            );

            setTimeout(function(){
            }, 1000);
             */

            await geocodeAddress('montefiore house, wessex lane, so182nu,southampton').then(
                ({ latitude, longitude }) => {
                    console.log('Latitude:', latitude)
                    console.log('Longitude:', longitude)
                    latlng.lat = latitude
                    latlng.lng = longitude
                },
            )

            console.log('***')
            console.log(latlng.lat, latlng.lng)
            console.log('***')
            const success = await register(
                email,
                name,
                password,
                selectedRole,
                address,
                description,
                latlng.lat,
                latlng.lng,
            )
            console.log('success', success)
            if (success) {
                console.log(
                    'Registering user with email: ' +
                        email +
                        ' and password: ' +
                        ' and latitude: ' +
                        latlng.lat +
                        ' and longitude: ' +
                        latlng.lng,
                )
                alert('Sign-up successful, redirecting to login page.')
                navigate('/login')
            }
        }
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
                        <label htmlFor='role' className='block mb-2 text-sm font-medium text-head dark:text-white'>
                            You are
                        </label>

                        <div className='flex'>
                            <div className='flex-1 p-2'>
                                <button
                                    onClick={() => setSelectedRole('serviceProvider')}
                                    className={`w-full flex items-center justify-center p-4 border rounded-lg transition ease-in-out duration-200 ${
                                        selectedRole === 'serviceProvider'
                                            ? 'bg-button text-white hover:bg-primary-700'
                                            : 'bg-white hover:bg-gray-50 text-head'
                                    }`}
                                >
                                    <span className='font-semibold leading-normal'>Service Provider</span>
                                </button>
                            </div>
                            <div className='w-1'></div>
                            <div className='flex-1 p-2'>
                                <button
                                    onClick={() => setSelectedRole('customer')}
                                    className={`w-full flex items-center justify-center p-4 border rounded-lg transition ease-in-out duration-200 ${
                                        selectedRole === 'customer'
                                            ? 'bg-button text-white hover:bg-primary-700'
                                            : 'bg-white hover:bg-gray-50 text-head'
                                    }`}
                                >
                                    <span className='font-semibold leading-normal'>Customer</span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <InputTextField
                                label='Your email'
                                type='email'
                                placeholder='Email address'
                                onChange={(value) => setEmail(value)}
                            />
                            <InputTextField
                                label='Your name'
                                type='text'
                                placeholder='Name'
                                onChange={(value) => setName(value)}
                            />
                            <InputTextField
                                label='Your password'
                                type='password'
                                placeholder='Password'
                                onChange={(value) => setPassword(value)}
                            />

                            <InputTextField
                                label='Your password Again'
                                type='password'
                                placeholder='Password'
                                onChange={(value) => setPasswordConfirm(value)}
                            />
                            <PasswordChecklist
                                rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
                                minLength={6}
                                value={password}
                                valueAgain={passwordConfirm}
                                onChange={(isValid) => {
                                    setPasswordValid(isValid)
                                }}
                            />

                            {selectedRole === 'serviceProvider' && (
                                <>
                                    <label className='block text-subhead text-sm font-bold mb-2'>Your Address</label>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <InputTextField
                                                label='House number or name'
                                                type='text'
                                                placeholder='House number or name'
                                                onChange={(value) => setAddressPart1(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputTextField
                                                label='Street'
                                                type='text'
                                                placeholder='street'
                                                onChange={(value) => setAddressPart2(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputTextField
                                                label='Post code'
                                                type='text'
                                                placeholder='Post code'
                                                onChange={(value) => setAddressPart3(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputTextField
                                                label='Town'
                                                type='text'
                                                placeholder='Town'
                                                onChange={(value) => setAddressPart4(value)}
                                            />
                                        </Grid>
                                    </Grid>
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
                                </>
                            )}
                            <button
                                type='submit'
                                className='w-full text-white bg-button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-button dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                data-te-ripple-color='light'
                            >
                                Sign up
                            </button>

                            <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-2'>
                                Already has an account?{' '}
                                <a
                                    href='/login'
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                >
                                    Login
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

export default Register
