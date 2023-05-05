import React, { useState } from 'react'
import { ServiceProvider } from '~/services/types/user'

type ProviderItemProps = {
    provider: ServiceProvider
    onRemove: () => void
}

const VerifyProviderCard: React.FC<ProviderItemProps> = ({ provider, onRemove }) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return (
        <div
            className='relative bg-white max-w-xl rounded-2xl px-10 py-2 shadow-lg hover:shadow-2xl transition duration-500 mt-4 divide-y'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='flex items-center py-4'>
                <div>
                    <div className='flex items-center space-x-4 py-4'>
                        <div className='text-sm font-semibold'>
                            <span className='bg-blue-800 text-white text-xl p-1 rounded-lg mr-2'>
                                {provider.rating.toFixed(1)}
                            </span>
                            <span className='text-xl'>|</span>
                            <span className='bg-green-800 text-white text-xl p-1 rounded-lg ml-2 mr-2'>
                                {provider.commentCount}
                            </span>
                            {provider.displayName} • <span className='font-normal'> {provider.email}</span>
                        </div>
                    </div>
                    <div className='text-sm font-normal text-gray-500'>{provider.address}</div>
                </div>
                <div className='ml-auto flex-shrink-0'>
                    <div className='flex flex-col items-end'>
                        <button
                            className='inline-block w-20 h-8 mb-2 font-bold text-white bg-error rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-green'
                            onClick={onRemove}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className='py-4'>
                <div className='text-sm text-gray-500'>{provider.description}</div>
            </div>
            {provider.rejectReason && isHover && (
                <div className='py-4'>
                    <div className='text-sm text-red-400'>
                        <b>Recent Reason for Refusal: </b>
                        <div>{provider.rejectReason}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyProviderCard
