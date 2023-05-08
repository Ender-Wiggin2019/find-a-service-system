import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import { ServiceProvider, ServiceProviderStatus } from '~/services/types/user'
import VerifyProviderCard from '~/components/Card/VerifyProviderCard'
import RejectReasonCreator from '~/components/Creator/RejectReasonCreator'

const VerifyPage: React.FC = () => {
    const [nonVerifiedProviders, setNonVerifiedProviders] = useState<ServiceProvider[]>([])
    const [rejectedProviders, setRejectedProviders] = useState<ServiceProvider[]>([])
    const [selectedUser, setSelectedUser] = useState<ServiceProvider>()
    const [isChanged, setIsChanged] = useState<boolean>(false)

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
                        ),
                    )
                }),
            )
            setNonVerifiedProviders(
                providersData.filter((provider) => provider.status === ServiceProviderStatus.NEED_TO_VERIFY),
            )
            setRejectedProviders(providersData.filter((provider) => provider.status === ServiceProviderStatus.REJECTED))
        }

        fetchServices()
    }, [isChanged])

    const onChangeStatus = async (uid: string, newStatus: ServiceProviderStatus) => {
        const confirmAccept = window.confirm(
            `Are you sure you want to change the service provider status to ${newStatus}?`,
        )
        if (confirmAccept) {
            try {
                await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, uid), {
                    status: newStatus,
                })
                setIsChanged(!isChanged)
                if (newStatus === 'removed') {
                    await deleteDoc(doc(db, FirebasePath.SERVICE_PROVIDER, uid))
                } else if (newStatus === 'accepted') {
                    await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, uid), {
                        rejectReason: deleteField(),
                        rating: 0,
                        commentCount: 0,
                    })
                } else if (newStatus === 'need to verify') {
                    await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, uid), {
                        rejectReason: deleteField(),
                    })
                }
            } catch (error) {
                console.error('Accept Service Provider Error: ', error)
            }
        }
    }

    const onReject = (index: number) => {
        setSelectedUser(nonVerifiedProviders[index])
    }

    return (
        <div className='flex py-6 flex-wrap md:flex-no-wrap justify-between'>
            <div className='w-full md:w-1/2 mx-auto py-4 px-4'>
                <div className='flex w-full items-center justify-between'>
                    <h2 className='text-xl font-medium text-head'>Need to Verify</h2>
                    <span className='ml-auto text-gray-500 text-sm'>
                        <span className='font-medium'>{nonVerifiedProviders.length}</span> item(s)
                    </span>
                </div>
                {nonVerifiedProviders.map((provider, index) => (
                    <VerifyProviderCard
                        key={index}
                        provider={provider}
                        blueButton={{
                            name: 'Accept',
                            handleClick: () => onChangeStatus(provider.uid, ServiceProviderStatus.ACCEPTED),
                        }}
                        redButton={{
                            name: 'Reject',
                            handleClick: () => onReject(index),
                        }}
                    />
                ))}
            </div>
            <div className='w-full md:w-1/2 py-4 px-4'>
                <div className='flex w-full items-center justify-between'>
                    <h2 className='text-xl font-medium text-head'>Rejected</h2>
                    <span className='ml-auto text-gray-500 text-sm'>
                        <span className='font-medium'>{rejectedProviders.length}</span> item(s)
                    </span>
                </div>
                {rejectedProviders.map((provider, index) => (
                    <VerifyProviderCard
                        key={index}
                        provider={provider}
                        blueButton={{
                            name: 'Recover',
                            handleClick: () => onChangeStatus(provider.uid, ServiceProviderStatus.NEED_TO_VERIFY),
                        }}
                        redButton={{
                            name: 'Remove',
                            handleClick: () => onChangeStatus(provider.uid, ServiceProviderStatus.REMOVED),
                        }}
                    />
                ))}
            </div>
            {selectedUser && (
                <div>
                    <RejectReasonCreator provider={selectedUser} />
                </div>
            )}
        </div>
    )
}

export default VerifyPage
