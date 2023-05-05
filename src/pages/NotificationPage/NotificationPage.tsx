import React from 'react'
import Page from '~/components/Page/Page'

import { useNavigate } from 'react-router-dom'
import { useAuthState } from '~/utils/hooks/UserContext'
import { updateMessageStatus, useUserNotifications } from '~/utils/hooks/UseUserNotifications'
import { IMessage, MessageStatus } from '~/services/types/message'
import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { formatTime } from '~/utils/FormatTime'

const NotificationPage: React.FC = () => {
    const navigate = useNavigate()
    const { state } = useAuthState()

    // 使用 useUserNotifications
    let uid = ''
    if (state.state === 'SIGNED_IN') {
        uid = state.currentUser.uid
    }

    const { loading, error, notifications } = useUserNotifications(uid, [MessageStatus.UNREAD, MessageStatus.READ])

    const handleClick = (message: IMessage) => async () => {
        if (state.state === 'SIGNED_IN' && message.message.status === MessageStatus.UNREAD) {
            const success = await updateMessageStatus(state.currentUser.uid, message, MessageStatus.READ)
            if (success) {
                console.log('Message status updated to READ.')
                navigate(0)
            } else {
                console.error('Failed to update message status.')
            }
        }
    }

    const handleNavigate = (url: string) => {
        if (url) {
            navigate(url)
        }
    }

    return (
        <Page>
            <div>
                {notifications.map((notification, index) => (
                    <div key={index} className='w-full bg-card shadow-xl rounded-md'>
                        <div className='flex'>
                            <div className='card-body w-3/4 flex flex-col justify-between p-4 cursor-pointer'>
                                <h2 className='text-head card-title mb-2'>{notification.message.body}</h2>
                                <div className='card-actions justify-end'>
                                    {/*<div className='flex justify-center items-baseline my-2'>*/}
                                    {/*    <span className='mr-2 text-5xl font-extrabold'>{'£' + serviceInformation.price}</span>*/}
                                    {/*    <span className='text-gray-500 dark:text-gray-400'>/hour</span>*/}
                                    {/*</div>*/}
                                    {notification.message.status === 'unread' && (
                                        <Button
                                            variant='contained'
                                            color='success'
                                            endIcon={<CheckIcon />}
                                            onClick={handleClick(notification)}
                                        >
                                            Read
                                        </Button>
                                    )}
                                    {notification.message.link != undefined && (
                                        <Button
                                            variant='contained'
                                            endIcon={<OpenInNewIcon />}
                                            onClick={() =>
                                                handleNavigate(notification.message.link || '/customer-home')
                                            }
                                        >
                                            Open {notification.message.link}
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {notification.message.status === 'unread' && (
                                <span className='w-3 h-3 bg-tertiary bottom-5 right-5 rounded-full'></span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    )
}

export default NotificationPage
