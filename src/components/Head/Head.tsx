import React from 'react'
import { useAuthState, useSignOut } from '~/utils/hooks/UserContext'
import { HeadContent } from './HeadContent'
import logo from '~/assets/favicon.png'
import { useNavigate } from 'react-router-dom'
import { useUserNotifications } from '~/utils/hooks/UseUserNotifications' // 导入 useUserNotifications
import { MessageStatus } from '~/services/types/message'

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME
const PROJECT_LINK = import.meta.env.VITE_PROJECT_LINK

export const Head: React.FC = () => {
    const { state } = useAuthState()
    const { signOut } = useSignOut()
    const navigate = useNavigate()

    // 使用 useUserNotifications
    let uid = ''
    if (state.state === 'SIGNED_IN') {
        uid = state.currentUser.uid
    }
    const { loading, error, notifications } = useUserNotifications(uid, [MessageStatus.UNREAD])

    const handleSignOut = () => {
        signOut()
        navigate('/services')
    }

    if (state.isLoading) {
        return <div className='h-14 bg-background dark:bg-head fixed w-full z-20 top-0 left-0'></div>
    }

    // 计算通知数量
    const notificationCount = notifications.length

    return (
        <nav className='bg-background px-2 sm:px-4 py-2.5 dark:bg-head fixed w-full z-20 top-0 left-0'>
            <div className='container flex flex-wrap items-center justify-between mx-auto'>
                <a href={PROJECT_LINK} className='flex items-center'>
                    <img src={logo} className='h-6 mr-3 sm:h-9' alt='Find a Service Logo' />
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
                                    {notificationCount > 0 && (
                                        <span className='w-3 h-3 bg-tertiary absolute bottom-7 right-0 rounded-full'></span>
                                    )}
                                </label>
                                <ul
                                    tabIndex={0}
                                    className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3'
                                >
                                    <li>
                                        <a
                                            href='/notifications'
                                            className={notificationCount > 0 ? 'text-tertiary' : ''}
                                        >
                                            Notifications{notificationCount > 0 && ` (${notificationCount})`}
                                        </a>
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
                        </div>
                    )}
                    <button
                        data-collapse-toggle='mobile-menu-2'
                        type='button'
                        className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg bg-white md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-subhead dark:focus:ring-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-button'
                        aria-controls='mobile-menu-2'
                        aria-expanded='false'
                        onClick={() => {
                            const menu = document.getElementById('mobile-menu-2')
                            if (menu) {
                                menu.classList.toggle('hidden')
                            }
                        }}
                    >
                        <span className='sr-only'>Open main menu</span>
                        <svg
                            className='w-6 h-6'
                            aria-hidden='true'
                            fill='#21ACFA'
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

                <div className='hidden w-full md:flex md:w-auto md:order-1' id='mobile-menu-2'>
                    <ul className='flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 bg-blue-200'>
                        <HeadContent />
                    </ul>
                </div>
            </div>
        </nav>
    )
}
