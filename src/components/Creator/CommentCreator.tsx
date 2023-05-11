import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '~/utils/hooks/UserContext'
import { useCommentCreator } from '~/utils/hooks/UseCommentCreator'
import StarRatings from 'react-star-ratings'
import { useRequestCreator } from '~/utils/hooks/UseRequestService'
import { ServiceStatus } from '~/services/types/request'

type CommentCreatorProps = {
    serviceId: string
    requestId: string
}

const CommentCreator: React.FC<CommentCreatorProps> = ({ serviceId, requestId }) => {
    const { state } = useAuthState()
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>('')

    const navigate = useNavigate()
    const { commentCreator } = useCommentCreator()
    const { updateRequest } = useRequestCreator()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN') {
            const name = state.currentUser.displayName ? state.currentUser.displayName : 'Anonymous'
            // FIXME: update interface
            const success = await commentCreator(serviceId as string, {
                uid: state.currentUser.uid,
                name: name,
                time: new Date(),
                // title: string,
                comment: comment,
                rating: rating,
            })

            if (success) {
                await updateRequest(requestId, {
                    status: ServiceStatus.FINISHED_COMMENT,
                })
                navigate(0)
            }
        }
    }

    return (
        <div>
            {/* The button to open modal */}
            <label
                htmlFor='my-modal-6'
                //     className='p-6 bg-button rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer'
                // >
                //     +
                // </label>
                className='flex items-center px-6 py-2 mt-auto cursor-pointer font-semibold text-white transition duration-500 ease-in-out transform bg-button rounded-md  hover:bg-button focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
            >
                Write Comment
            </label>

            {/* Put this part before </body> tag */}
            <input type='checkbox' id='my-modal-6' className='modal-toggle' />
            <div className='modal modal-middle'>
                <div className='modal-box'>
                    <label htmlFor='my-modal-6' className='btn btn-sm btn-circle absolute right-2 top-2'>
                        ✕
                    </label>

                    <form onSubmit={handleSubmit} className='mb-6'>
                        <StarRatings
                            starRatedColor='#ffde18'
                            starHoverColor='#ffde18'
                            rating={Number(rating)}
                            numberOfStars={5}
                            starDimension='25px'
                            starSpacing='2px'
                            name='rating'
                            changeRating={setRating}
                        />
                        <div className='p-2.5 py-2 mb-4 mt-2 bg-white rounded-sm border border-subhead dark:bg-subhead dark:border-subhead'>
                            <label htmlFor='comment' className='sr-only'>
                                Your comment
                            </label>
                            <textarea
                                id='comment'
                                rows={6}
                                className='px-0 w-full text-sm text-head border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-subhead'
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Write a comment...'
                                required
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-button rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                        >
                            Post comment
                        </button>
                    </form>
                    {/*<div className="modal-action">*/}
                    {/*    <label htmlFor="my-modal-6" className="btn">TODO</label>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default CommentCreator
