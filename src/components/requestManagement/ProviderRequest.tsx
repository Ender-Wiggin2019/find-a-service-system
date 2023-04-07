import React from 'react'
import { IService } from '~/components/types/service'
import { IRequest, ServiceStatus } from '~/components/types/request'
import RequestViewer from './RequestViewer'
import { useRequestCreator } from '~/components/requestService/UseRequestService'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import StatusButton from './StatusButton'

type RequestCardProps = {
    request: IRequest
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
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
        <div className='card card-compact w-full bg-base-100 shadow-xl'>
            <div className='card-body hover:bg-gray-100 cursor-pointer'>
                <h2>ID: {request.id}</h2>
                <h2 className='card-title'>{serviceInformation.name}</h2>
                <h2>SERVICE TIME: {dayjs(requestInformation.requestedTime).format('LLL')}</h2>
                <h2>LAST UPDATED: {dayjs(requestInformation.timestamp).format('LLL')}</h2>
                <h2>PRICE: {'£' + serviceInformation.price}</h2>
                <p>DESCRIPTION: {requestInformation.requestDescription}</p>
                <div className='card-actions justify-end'>
                    <div className='flex justify-center items-baseline my-2'>
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
    )
}

export default RequestCard
