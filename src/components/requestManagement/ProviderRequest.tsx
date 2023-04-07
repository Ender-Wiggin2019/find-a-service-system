import React from 'react'
import { IService } from '~/components/types/service'
import { IRequest, ServiceStatus } from '~/components/types/request'
import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import RequestViewer from './RequestViewer'
import {useRequestCreator} from "~/components/requestService/UseRequestService";
import { useNavigate } from 'react-router-dom'
// import {formatTime} from "~/components/utils/FormatTime";
import dayjs from 'dayjs'

type RequestCardProps = {
    request: IRequest
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
    const { updateRequest } = useRequestCreator();
    const navigate = useNavigate()

    const handleClick = async (status: ServiceStatus) => {
        const result = await updateRequest(request.id, {
            status: status,
        });

        if (result) {
            console.log('Request updated successfully');
        } else {
            console.log('Failed to update request');
        }
        navigate(0) // TODO: test only
    }

    const getStatusChip = (status: ServiceStatus) => {
        const statusText = status.toLowerCase()
        if (statusText === ServiceStatus.ACCEPTED.toLowerCase()) {
            return (
                <Button variant="contained" color="success" endIcon={<CheckIcon />} onClick={() => handleClick(ServiceStatus.ACCEPTED)}>
                    Confirm
                </Button>
            )
        } else if (statusText === ServiceStatus.NEED_MORE_INFO.toLowerCase()) {
            console.log('NEED_MORE_INFO')
            return (
                <Button variant="contained" color="warning" endIcon={<CheckIcon />} onClick={() => handleClick(ServiceStatus.NEED_MORE_INFO)}>
                    Need More Info
                </Button>)
        }
        return;
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
                <p>DESCRIPTION: {requestInformation.requestDescription}</p>{' '}
                {/* use line-clamp to limit the number of lines of text to 3 */}
                <div className='card-actions justify-end'>
                    <div className='flex justify-center items-baseline my-2'>
                        {(requestInformation.status === ServiceStatus.REQUESTED || requestInformation.status === ServiceStatus.NEED_MORE_INFO) && getStatusChip(ServiceStatus.ACCEPTED)}
                        {requestInformation.status === ServiceStatus.REQUESTED && getStatusChip(ServiceStatus.NEED_MORE_INFO)}
                        {getStatusChip(requestInformation.status)}
                        <RequestViewer Irequest={request} />
                        {/*<span className="mr-2 text-2xl font-extrabold"><span style={{ color: getStatusChip(requestInformation.status) }}>{requestInformation.status.toUpperCase()}</span></span>*/}
                    </div>
                    {/*<button className="btn btn-primary">See More</button>*/}
                </div>
            </div>
        </div>
    )
}

export default RequestCard
