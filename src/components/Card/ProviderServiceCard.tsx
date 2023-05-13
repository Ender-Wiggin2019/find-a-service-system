import React, { useState } from 'react'
import { IService } from '~/services/types/service'
import RequestList from '~/pages/RequestPage/RequestManagementPage/RequestListPage'
import { Button } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

type ServiceCardProps = {
    service: IService
}

const ProviderServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const serviceInformation = service.service
    const [showRequestList, setShowRequestList] = useState(false)
    const navigate = useNavigate()

    const handleViewRequestsClick = () => {
        setShowRequestList(!showRequestList)
    }

    return (
        <div>
            <div className='w-full bg-card shadow-xl rounded-md'>
                <div className='flex'>
                    <figure className='w-1/4'>
                        <img
                            src={serviceInformation.image}
                            alt={serviceInformation.name}
                            className='w-full h-40 object-cover rounded-l-md'
                        />
                    </figure>
                    <div className='card-body w-3/4 flex flex-col justify-between p-4 cursor-pointer'>
                        <div>
                            <h2 className='text-head card-title mb-2'>{serviceInformation.name}</h2>
                            <p className='text-subhead line-clamp-2'>{serviceInformation.description}</p>
                        </div>
                        <div className='card-actions justify-end'>
                            {/*<div className='flex justify-center items-baseline my-2'>*/}
                            {/*    <span className='mr-2 text-5xl font-extrabold'>{'£' + serviceInformation.price}</span>*/}
                            {/*    <span className='text-gray-500 dark:text-gray-400'>/hour</span>*/}
                            {/*</div>*/}
                            <Button
                                variant='contained'
                                className='bg-button'
                                color='secondary'
                                endIcon={<EditIcon />}
                                onClick={() => navigate(`/service-editor/${service.id}`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant='contained'
                                className='bg-button'
                                color='info'
                                endIcon={showRequestList ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                onClick={handleViewRequestsClick}
                            >
                                View Requests
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showRequestList && (
                <div className='mt-1 w-full bg-card shadow-xl rounded-md'>
                    <RequestList serviceId={service.id} />
                </div>
            )}
        </div>
    )
}

export default ProviderServiceCard
