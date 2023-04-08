import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../auth/UserContext'
import { useRequestCreator } from './UseRequestService'
import { ServiceStatus } from '~/components/types/request'
import InputTextField from '../shared/InputTextField'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

type RequestCreatorProps = {
    serviceId: string
}

const RequestCreator: React.FC<RequestCreatorProps> = ({ serviceId }) => {
    const { state } = useAuthState()
    const [requestDesc, setRequestDesc] = useState<string>('')
    const [time, setTime] = React.useState<Date | null>(null)

    const [serviceCategory, setServiceCategory] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [requireHours, setRequireHours] = React.useState<number>(1)

    const navigate = useNavigate()
    const { requestCreator } = useRequestCreator()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN' && time !== null) {
            console.log('test')
            const name = state.currentUser.displayName ? state.currentUser.displayName : 'Anonymous'
            const success = await requestCreator(
                serviceId as string, // service id
                state.currentUser.uid,
                serviceCategory,
                requireHours,
                address,
                requestDesc,
                time, // TODO: Need to store correct time in the services
                new Date(),
                ServiceStatus.REQUESTED,
            )
            console.log('success', success)
            if (success) {
                navigate(0)
            }
        }
    }

    return (
        <div>
            {/* The button to open modal */}
            <label
                htmlFor='my-modal-7'
                className='flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-button rounded-lg  hover:bg-button focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
            >
                Request
            </label>

            {/* Put this part before </body> tag */}
            <input type='checkbox' id='my-modal-7' className='modal-toggle' />
            <div className='modal modal-middle'>
                <div className='modal-box'>
                    <label htmlFor='my-modal-7' className='btn btn-sm btn-circle absolute right-2 top-2'>
                        ✕
                    </label>

                    <form onSubmit={handleSubmit} className='mb-6'>
                        <div className='mb-4'>
                            <label className='block text-head text-sm font-bold mb-2'>Date and Time</label>
                            <DateTimePicker
                                className='w-3/4 rounded-sm p-2.5 py-3 border-subhead'
                                label='Pick your time'
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                        </div>
                        <div className='flex flex-row grow gap-2'>
                            <InputTextField
                                label='Service Category'
                                type='text'
                                placeholder='Service Category'
                                isValid={true}
                                onChange={(value) => setServiceCategory(value)}
                            />
                            <InputTextField
                                label='Require Hours'
                                type='text'
                                placeholder='Require Hours'
                                isValid={true}
                                onChange={(value) => setRequireHours(Number(value))}
                            />
                        </div>
                        <InputTextField
                            label='Your Address'
                            type='text'
                            placeholder='Your address'
                            isValid={true}
                            onChange={(value) => setAddress(value)}
                        />
                        <label className='block text-head text-sm font-bold mb-2'>Request Description</label>
                        <div className='p-2.5 py-2 mb-4 mt-2 bg-white rounded-sm border border-subhead dark:bg-subhead dark:border-subhead'>
                            <textarea
                                id='comment'
                                rows={6}
                                className='px-0 w-full text-sm text-head border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-subhead'
                                onChange={(e) => setRequestDesc(e.target.value)}
                                placeholder='Write Request Description...'
                                required
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-button rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                        >
                            Send Request
                        </button>
                    </form>
                    {/*<div className="modal-action">*/}
                    {/*    <label htmlFor="my-modal-6" className="btn">TODO</label>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default RequestCreator
