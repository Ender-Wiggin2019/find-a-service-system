import React from 'react'
import { IService } from '~/services/types/service'
import { IRequest, ServiceStatus } from '~/services/types/request'
import RequestViewer from '../../pages/RequestPage/RequestManagementPage/RequestViewer'
import { useRequestCreator } from '~/utils/hooks/UseRequestService'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import StatusButton from '../Button/StatusButton'

type RequestCardProps = {
    request: IRequest
}

const RequestManagementCard: React.FC<RequestCardProps> = ({ request }) => {
    const { updateRequest } = useRequestCreator()
    const navigate = useNavigate()

    const handleClick = async (status: ServiceStatus) => {
        const result = await updateRequest(request.id, {
            status: status,
        })

        if (result) {
            console.log('Request updated successfully')
        } else {
            console.log('Failed to update request')
        }
        navigate(0) // TODO: test only
    }

    const requestInformation = request.request
    const serviceInformation = request.service

    return (
        <div className='w-full bg-card shadow-xl rounded-md p-2'>
            <div className='grid grid-cols-1 divide-y'>
                <div className='flex w-full justify-between'>
                    <div className='flex flex-col mr-4'>
                        <p className='font-bold text-head'>Order ID</p>
                        <p className='text-subhead'>{request.id}</p>
                    </div>
                    <div className='flex flex-col mr-4'>
                        <p className='font-bold text-head'>Order Time</p>
                        <p className='text-subhead'>{dayjs(requestInformation.timestamp).format('LLL')}</p>
                    </div>
                    <div className='flex flex-col mr-4'>
                        <p className='font-bold text-head'>Service Category</p>
                        <p className='text-subhead'>{requestInformation.requestCategory}</p>
                    </div>
                </div>
                <div className='mt-2'>
                    {/*<h2 className='card-title'>{serviceInformation.name}</h2>*/}
                    {/*<h2>SERVICE TIME: {dayjs(requestInformation.requestedTime).format('LLL')}</h2>*/}
                    {/*<h2>LAST UPDATED: {dayjs(requestInformation.timestamp).format('LLL')}</h2>*/}
                    {/*<h2>PRICE: {'£' + serviceInformation.price}</h2>*/}
                    {/*<p>DESCRIPTION: {requestInformation.requestDescription}</p>*/}
                    <div className='card-actions justify-end'>
                        <div className='flex justify-center items-baseline my-2 gap-4'>
                            {(requestInformation.status === ServiceStatus.REQUESTED ||
                                requestInformation.status === ServiceStatus.NEED_MORE_INFO) && (
                                <StatusButton
                                    status={ServiceStatus.ACCEPTED}
                                    onClick={() => handleClick(ServiceStatus.ACCEPTED)}
                                />
                            )}
                            {requestInformation.status === ServiceStatus.REQUESTED && (
                                <StatusButton
                                    status={ServiceStatus.NEED_MORE_INFO}
                                    onClick={() => handleClick(ServiceStatus.NEED_MORE_INFO)}
                                />
                            )}
                            {requestInformation.status === ServiceStatus.REQUESTED && (
                                <StatusButton
                                    status={ServiceStatus.DECLINED}
                                    onClick={() => handleClick(ServiceStatus.DECLINED)}
                                />
                            )}
                            <RequestViewer Irequest={request} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestManagementCard
