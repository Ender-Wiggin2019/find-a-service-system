import { useAuthState, useSignOut } from '~/utils/hooks/UserContext'
import { HeadContent } from './HeadContent'
import { useNavigate } from 'react-router-dom'

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME
const PROJECT_LINK = import.meta.env.VITE_PROJECT_LINK

export const Head: React.FC = () => {
    const { state } = useAuthState()
    const { signOut } = useSignOut()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/services')
    }

    return (
        <nav className='bg-background px-2 sm:px-4 py-2.5 dark:bg-head fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
            <div className='container flex flex-wrap items-center justify-between mx-auto'>
                <a href={PROJECT_LINK} className='flex items-center'>
                    <img
                        src='https://flowbite.com/docs/images/logo.svg'
                        className='h-6 mr-3 sm:h-9'
                        alt='Flowbite Logo'
                    />
                    <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                        {SERVICE_NAME}
                    </span>
                </a>
                <div className='flex md:order-2'>
                    {state.state !== 'SIGNED_IN' && (
                        <button
                            type='button'
                            onClick={() => (window.location.href = '/login')}
                            className='text-white bg-button hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-button dark:hover:bg-button dark:focus:ring-blue-800'
                        >
                            Login
                        </button>
                    )}
                    {state.state === 'SIGNED_IN' && (
                        <div className='flex items-center md:order-2'>
                            <div className='dropdown dropdown-bottom dropdown-end'>
                                <label tabIndex={0}>
                                    {/*<div className="avatar">*/}
                                    {/*    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">*/}
                                    {/*        <img alt="user avatar" src="" />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className='avatar placeholder'>
                                        <div className='bg-neutral-focus text-neutral-content rounded-full w-10'>
                                            <span className='text-3xl'>
                                                {state.currentUser.displayName?.charAt(0)?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3'
                                >
                                    <li>
                                        <a>Information</a>
                                    </li>
                                    <li>
                                        <a href='/setting'>Setting</a>
                                    </li>
                                    <li>
                                        <a className='text-gray-500' onClick={handleSignOut}>
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <button
                                data-collapse-toggle='mobile-menu-2'
                                type='button'
                                className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-subhead dark:focus:ring-gray-600'
                                aria-controls='mobile-menu-2'
                                aria-expanded='false'
                            >
                                <span className='sr-only'>Open main menu</span>
                                <svg
                                    className='w-6 h-6'
                                    aria-hidden='true'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                        clipRule='evenodd'
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    )}
                    <button
                        data-collapse-toggle='navbar-sticky'
                        type='button'
                        className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-subhead dark:focus:ring-gray-600'
                        aria-controls='navbar-sticky'
                        aria-expanded='false'
                    >
                        <span className='sr-only'>Open main menu</span>
                    </button>
                </div>
                <div
                    className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
                    id='navbar-sticky'
                >
                    <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-background'>
                        <HeadContent role={state.userType} />
                    </ul>
                </div>
            </div>
        </nav>
    )
}
