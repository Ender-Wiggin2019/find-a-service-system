import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState, } from "../auth/UserContext";
import { useRequestCreator } from "./UseRequestService";
import {ServiceStatus} from "~/components/types/request";
// import TDate from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

type RequestCreatorProps = {
    serviceId: string;
};

const RequestCreator: React.FC<RequestCreatorProps> = ({ serviceId }) => {
    const { state } = useAuthState();
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [time, setTime] = React.useState<Date | null>(null);

    const navigate = useNavigate();
    const { requestCreator } = useRequestCreator();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (state.state === "SIGNED_IN" && time !== null) {

            const name = state.currentUser.displayName ? state.currentUser.displayName : "Anonymous";
            const success = await requestCreator(
                serviceId as string, // service id
                state.currentUser.uid,
                comment,
                time, // TODO: Need to store correct time in the services
                new Date(),
                ServiceStatus.REQUESTED,
            );
            console.log('success', success)
            if (success) {
                navigate(0);
            }
        }
    };

    return (
            <div>
                {/* The button to open modal */}
                <label htmlFor="my-modal-7" className="flex items-center px-6 py-3 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg  hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">Request</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-7" className="modal-toggle" />
                <div className="modal modal-middle">
                    <div className="modal-box">
                        <label htmlFor="my-modal-7" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        <form onSubmit={handleSubmit} className="mb-6">
                            <DateTimePicker
                                className="w-3/4"
                                label="Pick your time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                               <div
                                className="py-2 px-4 mb-4 mt-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">Request Description</label>
                                <textarea id="comment" rows={6}
                                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                          onChange={(e) => setComment(e.target.value)}
                                          placeholder="Write Request Description..." required></textarea>
                            </div>
                            <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
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
};

export default RequestCreator;
