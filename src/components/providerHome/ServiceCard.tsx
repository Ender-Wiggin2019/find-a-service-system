import React, { useState } from 'react'
import { IService } from '~/components/types/service'
import RequestList from '../requestManagement/RequestList'
import {Button} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type ServiceCardProps = {
    service: IService
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const serviceInformation = service.service
    const [showRequestList, setShowRequestList] = useState(false)

    const handleViewRequestsClick = () => {
        setShowRequestList(!showRequestList)
    }

    return (
        <div className='w-full bg-base-100 shadow-xl'>
            <div className='flex'>
                <figure className='w-1/4'>
                    <img
                        src={serviceInformation.image}
                        alt={serviceInformation.name}
                        className='w-full h-40 object-cover rounded'
                    />
                </figure>
                <div className='card-body w-3/4 flex flex-col justify-between p-4 cursor-pointer'>
                    <div>
                        <h2 className='card-title mb-2'>{serviceInformation.name}</h2>
                        <p className='line-clamp-3'>{serviceInformation.description}</p>
                    </div>
                    <div className='card-actions justify-end'>
                        {/*<div className='flex justify-center items-baseline my-2'>*/}
                        {/*    <span className='mr-2 text-5xl font-extrabold'>{'£' + serviceInformation.price}</span>*/}
                        {/*    <span className='text-gray-500 dark:text-gray-400'>/hour</span>*/}
                        {/*</div>*/}
                        <Button variant='contained' color='info' endIcon={showRequestList ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} onClick={handleViewRequestsClick}>
                            View Requests
                        </Button>
                    </div>
                </div>
            </div>
            {showRequestList && <RequestList serviceId={service.id}/>} {/* Render the RequestList component conditionally */}
        </div>
    )
}

export default ServiceCard
