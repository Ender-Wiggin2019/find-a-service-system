import React, { useEffect, useState, ChangeEvent } from 'react'
// import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, deleteDoc, updateDoc } from 'firebase/firestore'
import CommentCard from '~/components/Card/CommentCard'
import { Service, Comment, IComment } from '~/services/types/service'
// import { ServiceProvider } from '~/components/types/user';
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'

type ServiceCardProps = {
    serviceId: string
}

const CommentsList: React.FC<ServiceCardProps> = ({ serviceId }) => {
    const [comments, setComments] = useState<Array<IComment>>([])

    // console.log(comments);

    useEffect(() => {
        const fetchComments = async () => {
            const serviceCollection = collection(db, FirebasePath.SERVICE, serviceId, FirebasePath.COMMENT)
            const commentSnapshot = await getDocs(serviceCollection)
            const commentsData: IComment[] = []

            await Promise.all(
                commentSnapshot.docs.map(async (singleDoc) => {
                    const data = singleDoc.data()

                    const time = new Date(data.time.seconds * 1000) // data.time has two parameters: seconds and nanoseconds
                    // console.log(data);
                    // const serviceProviderDoc = await getDoc(doc(db, "serviceProvider", data.uid));
                    // const serviceProviderData = serviceProviderDoc.data();
                    // console.log(serviceProviderData);

                    commentsData.push({
                        id: singleDoc.id,
                        comment: {
                            uid: data.uid,
                            name: data.name,
                            time: time,
                            // title: string;
                            comment: data.comment,
                            rating: data.rating,
                        },
                        serviceId: serviceId,
                    })
                }),
            )

            setComments(commentsData)
        }

        fetchComments()
    }, [])

    const onDelete = async (index: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?')
        if (confirmDelete && comments[index]?.id) {
            try {
                const id = comments[index].id
                const curRating = comments[index].comment.rating
                const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, serviceId))
                if (serviceDoc.exists()) {
                    const providerDoc = await getDoc(doc(db, FirebasePath.SERVICE_PROVIDER, serviceDoc.data().uid))
                    if (providerDoc.exists()) {
                        await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, serviceDoc.data().uid), {
                            commentCount:
                                providerDoc.data().commentCount - 1 <= 0 ? 0 : providerDoc.data().commentCount - 1,
                            rating:
                                providerDoc.data().commentCount - 1 <= 0
                                    ? 0
                                    : (providerDoc.data().rating * providerDoc.data().commentCount - curRating) /
                                      (providerDoc.data().commentCount - 1),
                        })
                    }
                }
                await deleteDoc(doc(db, FirebasePath.SERVICE, serviceId, FirebasePath.COMMENT, id))
                const newComments = comments.filter((_, cur) => cur !== index)
                setComments(newComments)
                console.log(comments)
            } catch (error) {
                console.error('Delete Comment Error: ', error)
            }
        }
    }

    return (
        <div className='w-full grid grid-cols-1 gap-2'>
            {comments.map((comment, index) => (
                <CommentCard
                    id={comment.id}
                    key={index}
                    uid={comment.comment.uid}
                    name={comment.comment.name}
                    time={comment.comment.time}
                    comment={comment.comment.comment}
                    rating={comment.comment.rating}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </div>
    )
}

export default CommentsList
