import React from 'react';
import { IService } from '~/components/types/service';
import {IRequest, ServiceStatus} from "~/components/types/request";
import { Chip} from "@mui/material";
// import {formatTime} from "~/components/utils/FormatTime";
import dayjs from "dayjs";

type RequestCardProps = {
    request: IRequest;
};

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {

    const getColor = (status: ServiceStatus) => {
        const statusText = status.toLowerCase();
        if (statusText === ServiceStatus.ACCEPTED.toLowerCase()) {return <Chip label={statusText} color="success" />;}
        else if (statusText === ServiceStatus.REQUESTED.toLowerCase()) {return <Chip label={statusText} color="warning" />;}
        else if (statusText === ServiceStatus.DECLINED.toLowerCase()) {return <Chip label={statusText} color="error" />;}
        else if (statusText === ServiceStatus.COMPLETED.toLowerCase()) {return <Chip label={statusText} color="primary" variant="outlined" />;}
        return <Chip label={statusText} color="warning" variant="outlined"/>;
    };
    const requestInformation = request.request;
    const serviceInformation = request.service;
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl">
            <div className="card-body hover:bg-gray-100 cursor-pointer">
                <h2>ID: {request.id}</h2>
                <h2 className="card-title">{serviceInformation.name}</h2>
                <h2>SERVICE TIME: { dayjs(requestInformation.timestamp).format('LLL') }</h2>
                <h2>LAST UPDATED: { dayjs(requestInformation.timestamp).format('LLL') }</h2>
                <h2>PRICE: {'£'+serviceInformation.price}</h2>
                <p>DESCRIPTION: {requestInformation.requestDescription}</p> { /* use line-clamp to limit the number of lines of text to 3 */}
                <div className="card-actions justify-end">
                    <div className="flex justify-center items-baseline my-2">
                        {getColor(requestInformation.status)}
                        {/*<span className="mr-2 text-2xl font-extrabold"><span style={{ color: getColor(requestInformation.status) }}>{requestInformation.status.toUpperCase()}</span></span>*/}
                    </div>
                    {/*<button className="btn btn-primary">See More</button>*/}
                </div>
            </div>
        </div>

    );
};

export default RequestCard;
