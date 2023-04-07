import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../auth/UserContext'
import { useRequestCreator } from '../requestService/UseRequestService'
import {IRequest, ServiceStatus} from '~/components/types/request'
import InputTextField from '../shared/InputTextField'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

type RequestCreatorProps = {
    // sid: string, // user.uid
    // uid: string,
    // requestCategory: string,
    // requiredHours: number,
    // propsAddress: string,
    // requestDescription: string,
    // requestedTime: Date,
    // timestamp: Date,
    // status: ServiceStatus,
    Irequest: IRequest
}

const RequestViewer: React.FC<RequestCreatorProps> = ({ Irequest }) => {
    const request = Irequest.request
    const { state } = useAuthState()
    const [requestDesc, setRequestDesc] = useState<string>(request.requestDescription)
    const [time, setTime] = React.useState<Date | null>(request.requestedTime)

    const [serviceCategory, setServiceCategory] = React.useState<string>(request.requestCategory)
    const [address, setAddress] = React.useState<string>(request.address)
    const [requireHours, setRequireHours] = React.useState<number>(request.requiredHours || 0)

    const canEdit = (state.state === 'SIGNED_IN' && state.currentUser.uid === request.uid); // user only

    const navigate = useNavigate()
    const { requestCreator } = useRequestCreator()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (canEdit && time !== null) {
            const success = await requestCreator(
                request.sid,
                request.uid,
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

    // console.log('request', canEdit)
    return (
        <div>
            {/* The button to open modal */}
            <label
                htmlFor='my-modal-7'
                className='flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg  hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
            >
                View Details
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
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Date and Time</label>
                            <DateTimePicker
                                className='w-3/4'
                                label='Pick your time'
                                value={dayjs(time)}
                                disabled={!canEdit}
                                onChange={(newValue) => setTime(dayjs(newValue).toDate())}
                            />
                        </div>
                        <div className='flex flex-row grow gap-2'>
                            <InputTextField
                                label='Service Category'
                                type='text'
                                placeholder='Service Category'
                                value={serviceCategory}
                                isValid={true}
                                disabled={!canEdit}
                                onChange={(value) => setServiceCategory(value)}
                            />
                            <InputTextField
                                label='Require Hours'
                                type='text'
                                placeholder='Require Hours'
                                value={requireHours.toString()}
                                isValid={true}
                                disabled={!canEdit}
                                onChange={(value) => setRequireHours(Number(value))}
                            />
                        </div>
                        <InputTextField
                            label='Your Address'
                            type='text'
                            placeholder='Your address'
                            value={address}
                            isValid={true}
                            disabled={!canEdit}
                            onChange={(value) => setAddress(value)}
                        />
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Request Description</label>
                        <div className='py-2 px-4 mb-4 mt-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                            <textarea
                                id='comment'
                                rows={6}
                                className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                onChange={(e) => setRequestDesc(e.target.value)}
                                placeholder='Write Request Description...'
                                value={requestDesc}
                                disabled={!canEdit}
                                required
                            ></textarea>
                        </div>
                        {canEdit && (<button
                            type='submit'
                            disabled={!canEdit}
                            className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                        >
                            Update
                        </button>)
                        }
                    </form>
                    {/*<div className="modal-action">*/}
                    {/*    <label htmlFor="my-modal-6" className="btn">TODO</label>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default RequestViewer
