import React from 'react';
import { IService } from '~/components/types/service';

type ServiceCardProps = {
    service: IService;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const serviceInformation = service.service;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={serviceInformation.image} alt={serviceInformation.name} className="w-full h-40 object-cover rounded" /></figure>
            <div className="card-body hover:bg-gray-100">
                <h2 className="card-title">{serviceInformation.name}</h2>
                <p>{serviceInformation.description}</p>
                <div className="card-actions justify-end">
                    <div className="flex justify-center items-baseline my-2">
                        <span className="mr-2 text-5xl font-extrabold">{'£'+serviceInformation.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">/hour</span>
                    </div>
                    {/*<button className="btn btn-primary">See More</button>*/}
                </div>
            </div>
        </div>

    );
};

export default ServiceCard;
