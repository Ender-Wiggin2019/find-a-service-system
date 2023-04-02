import React, { useEffect, useState, ChangeEvent } from 'react';
// import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import CommentCard from './Comment';
import { Service, Comment } from '~/components/types/service';
// import { ServiceProvider } from '~/components/types/user';
import { db } from '~/lib/firebase';
import { SERVICE_FIRESTORE_PATH, COMMENT_FIRESTORE_PATH } from '~/lib/constants';

type ServiceCardProps = {
    serviceId: string;
};

const CommentsList: React.FC<ServiceCardProps> = ({ serviceId }) => {
    const [comments, setComments] = useState<Array<Comment>>([]);

    // console.log(comments);

    useEffect(() => {
        const fetchComments = async () => {
            const serviceCollection = collection(db, SERVICE_FIRESTORE_PATH, serviceId, COMMENT_FIRESTORE_PATH);
            const commentSnapshot = await getDocs(serviceCollection);
            const commentsData: Comment[] = [];

            await Promise.all(commentSnapshot.docs.map(async (singleDoc) => {
                const data = singleDoc.data();

                const time = new Date(data.time.seconds * 1000) // data.time has two parameters: seconds and nanoseconds
                // console.log(data);
                // const serviceProviderDoc = await getDoc(doc(db, "serviceProvider", data.uid));
                // const serviceProviderData = serviceProviderDoc.data();
                // console.log(serviceProviderData);

                commentsData.push({
                    uid: data.uid,
                    name: data.name,
                    time: time,
                    // title: string;
                    comment: data.comment,
                    rating: data.rating,
                });
            }));

            setComments(commentsData);
        };

        fetchComments();
    }, []);

    return (
            <div className="w-full grid grid-cols-1 gap-2">
                {comments.map((comment, index) => (
                    <CommentCard key={index} uid={comment.uid} name={comment.name} time={comment.time} comment={comment.comment} rating={comment.rating} />
                    // <CommentCard  key={index}/>
                    // <CommentCard key={index+'1'} name="Annie" time="6 minutes ago" rating="2" comment="very good"/>
                    ))}
            </div>
    );
};

export default CommentsList;
