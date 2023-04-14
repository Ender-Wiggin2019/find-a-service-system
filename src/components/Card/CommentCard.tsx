import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings'

// import { useParams } from 'react-router-dom';
// import {getDoc, doc, collection, getDocs} from 'firebase/firestore';
// import { db } from '~/lib/firebase';
// import { IService } from '~/types/service';
// import { FirebasePath } from '~/lib/constants';
// import {ServiceProvider} from "~/components/types/user";
import { formatTime } from '~/utils/FormatTime'
import { Service, Comment } from '~/services/types/service'
import { useAuthState } from '~/utils/hooks/UserContext'
import { FaTimes } from 'react-icons/fa'
import { commentColFactory, db } from '~/services/lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { FirebasePath } from '~/services/lib/constants'
import { useNavigate } from 'react-router-dom'

/* Ender: Note that this should be a single component, which should in a father component such as CommentList */

type CommentCardProps = {
    id: string
    uid: string
    name: string
    time: Date
    comment: string
    rating: number
    onDelete: () => void
}

const CommentCard: React.FC<CommentCardProps> = ({ id, uid, name, time, comment, rating, onDelete }) => {
    // const { serviceId } = useParams<{ serviceId: string }>();
    // const [service, setService] = useState<Service | null>(null);
    //
    //
    //
    // useEffect(() => {
    //     const fetchService = async () => {
    //         if (!serviceId) return;
    //         const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, serviceId));
    //         console.log(serviceDoc)
    //         if (serviceDoc.exists()) {
    //             const data = serviceDoc.data() as Service;
    //             setService({ ...data, id: serviceDoc.id });
    //         }
    //     };
    //
    //     fetchService();
    // }, [serviceId]);
    //
    // if (!service) {
    //     return <div>Loading...</div>;
    // }

    const { state } = useAuthState()

    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const handleMouseEnter = () => {
        if (state.userType === 'admin') {
            setShowDeleteButton(true)
        }
    }

    const handleMouseLeave = () => {
        setShowDeleteButton(false)
    }

    return (
        <div
            className='relative bg-white max-w-xl rounded-2xl px-10 py-2 shadow-lg hover:shadow-2xl transition duration-500'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/*<div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">LOGO</div>*/}
            <div className='mt-4 flex items-center space-x-4 py-2'>
                <div className=''>
                    <img
                        className='w-12 h-12 rounded-full'
                        src='https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80'
                        alt=''
                    />
                </div>
                <div className='text-sm font-semibold'>
                    {name} • <span className='font-normal'> {formatTime(time)}</span>
                </div>
            </div>
            <div className='mt-1'>
                {/*<h1 className="text-lg text-subhead font-semibold cursor-pointer"> {title} </h1>*/}
                <div className='flex mt-2'>
                    <StarRatings
                        starRatedColor='#ffde18'
                        rating={Number(rating)}
                        numberOfStars={5}
                        starDimension='25px'
                        starSpacing='2px'
                        name='rating'
                    />
                </div>
                <p className='mt-4 text-md text-gray-600'>{comment}</p>
                {/*<div className="flex justify-between items-center">*/}
                {/*    <div className="mt-4 flex items-center space-x-4 py-6">*/}
                {/*        <div className="">*/}
                {/*            <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80" alt="" />*/}
                {/*        </div>*/}
                {/*        <div className="text-sm font-semibold">John Lucas • <span className="font-normal"> 5 minutes ago</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">+</div>*/}
                {/*</div>*/}
            </div>

            {showDeleteButton && (
                <div className='absolute top-0 right-0'>
                    <button className='p-1 rounded-md bg-red-500 text-white hover:bg-red-600' onClick={onDelete}>
                        <FaTimes />
                    </button>
                </div>
            )}
        </div>
    )
}

export default CommentCard
