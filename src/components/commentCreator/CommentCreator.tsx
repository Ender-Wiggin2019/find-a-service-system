import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../auth/UserContext'
import { useCommentCreator } from './UseCommentCreator'
import StarRatings from 'react-star-ratings'
import { IService } from '~/components/types/service'

type CommentCreatorProps = {
    serviceId: string
}

const CommentCreator: React.FC<CommentCreatorProps> = ({ serviceId }) => {
    const { state } = useAuthState()
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>('')

    const navigate = useNavigate()
    const { commentCreator } = useCommentCreator()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (state.state === 'SIGNED_IN') {
            const name = state.currentUser.displayName ? state.currentUser.displayName : 'Anonymous'
            const success = await commentCreator(serviceId as string, {
                uid: state.currentUser.uid,
                name: name,
                time: new Date(),
                // title: string,
                comment: comment,
                rating: rating,
            })
            console.log('success', success)
            if (success) {
                navigate(0)
            }
        }
    }

    return (
        <div>
            {/* The button to open modal */}
            <label
                htmlFor='my-modal-6'
                className='p-6 bg-primary-600 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer'
            >
                +
            </label>
            <p className='text-center text-gray-500 text-xs'>Dev Note: click here to create a comment</p>

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
                        <div className='py-2 px-4 mb-4 mt-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                            <label htmlFor='comment' className='sr-only'>
                                Your comment
                            </label>
                            <textarea
                                id='comment'
                                rows={6}
                                className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Write a comment...'
                                required
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
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
