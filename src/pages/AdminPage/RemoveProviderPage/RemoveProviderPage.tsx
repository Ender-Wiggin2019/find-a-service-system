import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import { ServiceProvider, ServiceProviderStatus } from '~/services/types/user'
import RemoveProviderCard from '~/components/Card/RemoveProviderCard'
import StarRatings from 'react-star-ratings'

const RemovePage: React.FC = () => {
    const [providers, setProviders] = useState<ServiceProvider[]>([])
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(3)
    const [commentCount, setCommentCount] = useState<number>(0)

    // read data from firebase to `providers`
    useEffect(() => {
        const fetchServices = async () => {
            const serviceCollection = collection(db, FirebasePath.SERVICE_PROVIDER)
            const serviceSnapshot = await getDocs(serviceCollection)
            const providersData: ServiceProvider[] = []

            await Promise.all(
                serviceSnapshot.docs.map(async (singleDoc) => {
                    const data = singleDoc.data()
                    providersData.push(
                        new ServiceProvider(
                            singleDoc.id,
                            data.displayName,
                            data.email,
                            data.address,
                            data.description,
                            data.status,
                            data.rejectReason,
                            data.rating,
                            data.commentCount,
                        ),
                    )
                }),
            )
            providersData.sort((a, b) => a.rating - b.rating)
            setProviders(
                providersData.filter(
                    (provider) =>
                        provider.status === ServiceProviderStatus.ACCEPTED &&
                        provider.rating <= rating &&
                        provider.commentCount >= commentCount,
                ),
            )
        }

        fetchServices()
    }, [commentCount, isChanged, rating])

    const onChangeStatus = async (uid: string) => {
        const confirmAccept = window.confirm(`Are you sure you want to remove the service provider?`)
        if (confirmAccept) {
            try {
                setIsChanged(!isChanged)
                await deleteDoc(doc(db, FirebasePath.SERVICE_PROVIDER, uid))
            } catch (error) {
                console.error('Accept Service Provider Error: ', error)
            }
        }
    }

    return (
        <div className='flex py-6 flex-wrap md:flex-no-wrap justify-between'>
            <div className='w-full md:w-1/2 mx-auto py-4 px-4'>
                <div className='flex w-full items-center justify-between mb-2'>
                    <h2 className='flex text-xl font-medium text-head mr-2'>Rating lower than </h2>
                    <StarRatings
                        starRatedColor='blue'
                        starHoverColor='blue'
                        rating={Number(rating)}
                        numberOfStars={5}
                        starDimension='25px'
                        starSpacing='2px'
                        name='rating'
                        changeRating={setRating}
                    />
                    <span className='ml-auto text-gray-500 text-sm'></span>
                </div>
                <div className='flex w-full items-center justify-between'>
                    <h2 className='flex text-xl font-medium text-head mr-2'>Comments more than </h2>
                    <input
                        type='number'
                        className='w-20 h-8 text-green-800 font-bold rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                        title='comment number'
                        defaultValue={0}
                        onChange={(value) => setCommentCount(Number(value.target.value))}
                    />
                    <span className='ml-auto text-gray-500 text-sm'>
                        <span className='font-medium'>{providers.length}</span> item(s)
                    </span>
                </div>
                {providers.map((provider, index) => (
                    <RemoveProviderCard key={index} provider={provider} onRemove={() => onChangeStatus(provider.uid)} />
                ))}
            </div>
        </div>
    )
}

export default RemovePage
