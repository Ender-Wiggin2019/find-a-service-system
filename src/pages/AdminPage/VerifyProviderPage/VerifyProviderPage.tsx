import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc, deleteField } from 'firebase/firestore'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import { ServiceProvider, ServiceProviderStatus } from '~/services/types/user'
import VerifyProviderCard from '~/components/Card/VerifyProviderCard'
import RejectReasonCreator from '~/components/Creator/RejectReasonCreator'

const VerifyPage: React.FC = () => {
    const [nonVerifiedProviders, setNonVerifiedProviders] = useState<ServiceProvider[]>([])
    const [rejectedProviders, setRejectedProviders] = useState<ServiceProvider[]>([])
    const [selectedUser, setSelectedUser] = useState<ServiceProvider>()

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
    }, [])

    const onChangeStatus = async (index: number, newStatus: ServiceProviderStatus) => {
        const confirmAccept = window.confirm(
            `Are you sure you want to change the service provider status to ${newStatus}?`,
        )
        if (confirmAccept) {
            try {
                let providers = nonVerifiedProviders
                if (newStatus === 'need to verify' || newStatus === 'removed') {
                    providers = rejectedProviders
                }
                await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, providers[index].uid), {
                    status: newStatus,
                })
                if (newStatus === 'need to verify') {
                    const newNonVerifiedProviders = nonVerifiedProviders
                    newNonVerifiedProviders.push(rejectedProviders[index])
                    setNonVerifiedProviders(newNonVerifiedProviders)
                    const newRejectedProviders = rejectedProviders.filter((_, cur) => cur !== index)
                    setRejectedProviders(newRejectedProviders)
                } else if (newStatus === 'rejected') {
                    const newRejectedProviders = rejectedProviders
                    newRejectedProviders.push(nonVerifiedProviders[index])
                    setRejectedProviders(newRejectedProviders)
                    const newNonVerifiedProviders = nonVerifiedProviders.filter((_, cur) => cur !== index)
                    setNonVerifiedProviders(newNonVerifiedProviders)
                } else if (newStatus === 'removed') {
                    const newRejectedProviders = rejectedProviders.filter((_, cur) => cur !== index)
                    setRejectedProviders(newRejectedProviders)
                } else if (newStatus === 'accepted') {
                    await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, providers[index].uid), {
                        rejectReason: deleteField(),
                    })
                    const newNonVerifiedProviders = nonVerifiedProviders.filter((_, cur) => cur !== index)
                    setNonVerifiedProviders(newNonVerifiedProviders)
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
        <div className='flex py-6 flex-wrap md:flex-no-wrap'>
            <div className='w-full md:w-1/2 mx-auto py-4 px-4'>
                <div className='w-full items-center justify-between'>
                    <h2 className='text-2xl font-medium text-head'>Need to Verify</h2>
                    <div className='text-gray-500 text-sm'>
                        <span className='font-medium'>{nonVerifiedProviders.length}</span> items
                    </div>
                </div>
                {nonVerifiedProviders.map((provider, index) => (
                    <VerifyProviderCard
                        key={index}
                        provider={provider}
                        blueButton={{
                            name: 'Accept',
                            handleClick: () => onChangeStatus(index, ServiceProviderStatus.ACCEPTED),
                        }}
                        redButton={{
                            name: 'Reject',
                            handleClick: () => onReject(index),
                        }}
                    />
                ))}
            </div>
            <div className='w-full md:w-1/2 py-4 px-4'>
                <div className='w-full items-center justify-between'>
                    <h2 className='text-2xl font-medium text-head'>Rejected</h2>
                    <div className='text-gray-500 text-sm'>
                        <span className='font-medium'>{rejectedProviders.length}</span> items
                    </div>
                </div>
                {rejectedProviders.map((provider, index) => (
                    <VerifyProviderCard
                        key={index}
                        provider={provider}
                        blueButton={{
                            name: 'Recover',
                            handleClick: () => onChangeStatus(index, ServiceProviderStatus.NEED_TO_VERIFY),
                        }}
                        redButton={{
                            name: 'Remove',
                            handleClick: () => onChangeStatus(index, ServiceProviderStatus.REMOVED),
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
