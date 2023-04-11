import React from 'react'
import { IService } from '~/services/types/service'

type ServiceCardProps = {
    service: IService
}

const CustomerServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const serviceInformation = service.service
    return (
        <div className='card card-compact w-90 md:w-80 lg:w-80 bg-base-100 shadow-xl'>
            <figure>
                <img
                    src={serviceInformation.image}
                    alt={serviceInformation.name}
                    className='w-full h-40 object-cover rounded-t'
                />
            </figure>
            <div className='card-body hover:bg-gray-100 hover:rounded-b-md cursor-pointer h-52'>
                <h1 className='card-title text-head'>{serviceInformation.name}</h1>
                <p className='line-clamp-3 text-subhead'>{serviceInformation.description}</p>{' '}
                {/* use line-clamp to limit the number of lines of text to 3 */}
                <div className='card-actions justify-end'>
                    <div className='flex justify-center items-baseline my-2'>
                        <span className='mr-2 text-5xl text-head font-extrabold'>{'£' + serviceInformation.price}</span>
                        <span className='text-subhead'>/hour</span>
                    </div>
                    {/*<button className="btn btn-primary">See More</button>*/}
                </div>
            </div>
        </div>
    )
}

export default CustomerServiceCard
