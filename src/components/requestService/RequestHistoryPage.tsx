import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import RequestCard from './Request'
import { Service, IService, Comment } from '~/components/types/service'
import { ServiceProvider } from '~/components/types/user'
import { db } from '~/lib/firebase'
import { COMMENT_FIRESTORE_PATH, REQUEST_FIRESTORE_PATH, SERVICE_FIRESTORE_PATH } from '~/lib/constants'
import { IRequest, RequestCreator } from '~/components/types/request'
import { useAuthState, useSignOut } from '~/components/auth/UserContext'

const RequestHistoryPage: React.FC = () => {
    const { state } = useAuthState()
    const [requests, setRequests] = useState<IRequest[]>([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('coverArea')

    useEffect(() => {
        const fetchRequests = async () => {
            console.log(state.state)
            if (state.state === 'SIGNED_IN') {
                console.log(state.currentUser.uid)
                const requestCollection = collection(db, REQUEST_FIRESTORE_PATH)
                const q = query(requestCollection, where('uid', '==', state.currentUser.uid))
                const requestSnapshot = await getDocs(q)
                const requestData: IRequest[] = []

                await Promise.all(
                    requestSnapshot.docs.map(async (singleDoc) => {
                        const data = singleDoc.data()

                        const serviceDoc = await getDoc(doc(db, SERVICE_FIRESTORE_PATH, data.sid))
                        const serviceData = serviceDoc.data()
                        console.log(serviceData)

                        if (serviceData) {
                            const serviceDetail = new Service(
                                serviceData.uid,
                                serviceData.name,
                                serviceData.image,
                                serviceData.price,
                                serviceData.coverArea,
                                serviceData.time,
                                serviceData.description,
                                serviceData.isVerified,
                            )

                            if (data) {
                                requestData.push({
                                    request: new RequestCreator(
                                        data.sid,
                                        data.uid,
                                        data.requestCategory,
                                        data.requiredHours,
                                        data.address,
                                        data.requestDescription,
                                        data.requestedTime,
                                        data.timestamp,
                                        data.status,
                                    ),
                                    id: singleDoc.id,
                                    service: serviceDetail,
                                })
                            }
                        }
                    }),
                )

                setRequests(requestData)
            }
        }
        fetchRequests()
    }, [state])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
    }

    return (
        <div className='container h-full px-6 py-12'>
            <h2 className='text-2xl font-bold mb-4'>Service Request History</h2>
            <div className='service-cards grid grid-cols-1 gap-2'>
                {requests.map((request, index) => (
                    <Link key={index} to={`/service/${request.id}`}>
                        <RequestCard request={request} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RequestHistoryPage
