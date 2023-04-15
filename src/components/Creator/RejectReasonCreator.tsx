import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServiceProvider } from '~/services/types/user'
import { useRejectReasonCreator } from '~/utils/hooks/UseRejectReasonCreator'

type RejectReasonCreatorProps = {
    provider: ServiceProvider
}

const RejectReasonCreator: React.FC<RejectReasonCreatorProps> = ({ provider }) => {
    const [reason, setReason] = useState<string>('')

    const navigate = useNavigate()
    const { reasonCreator } = useRejectReasonCreator()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await reasonCreator(provider.uid, reason)
        console.log('success', success)
        if (success) {
            navigate(0)
        }
    }

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type='checkbox' id='my-modal-6' className='modal-toggle' />
            <div className='modal modal-middle'>
                <div className='modal-box'>
                    <label htmlFor='my-modal-6' className='btn btn-sm btn-circle absolute right-2 top-2'>
                        ✕
                    </label>
                    <div>Reasons for rejecting {provider.displayName}</div>
                    <form onSubmit={handleSubmit} className='mb-6'>
                        <div className='p-2.5 py-2 mb-4 mt-2 bg-white rounded-sm border border-subhead dark:bg-subhead dark:border-subhead'>
                            <label htmlFor='reason' className='sr-only'>
                                Your reject reason
                            </label>
                            <textarea
                                id='reason'
                                rows={6}
                                className='px-0 w-full text-sm text-head border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-subhead'
                                onChange={(e) => setReason(e.target.value)}
                                placeholder='Write your reject reason...'
                                required
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-button rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                        >
                            Post rejection
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RejectReasonCreator
