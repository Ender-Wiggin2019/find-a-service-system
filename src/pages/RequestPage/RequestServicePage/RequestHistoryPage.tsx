import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import RequestServiceCard from '~/components/Card/RequestServiceCard'
import { Service, IService, Comment } from '~/services/types/service'
import { ServiceProvider } from '~/services/types/user'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import { IRequest, RequestCreator } from '~/services/types/request'
import { useAuthState, useSignOut } from '~/utils/hooks/UserContext'

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
                const requestCollection = collection(db, FirebasePath.REQUEST)
                const q = query(requestCollection, where('uid', '==', state.currentUser.uid))
                const requestSnapshot = await getDocs(q)
                const requestData: IRequest[] = []

                await Promise.all(
                    requestSnapshot.docs.map(async (singleDoc) => {
                        const data = singleDoc.data()

                        const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, data.sid))
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
                                serviceData.category,
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
                                        data.completeCheck ? data.completeCheck : 0,
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
        <div>
            <h2 className='text-2xl font-bold mb-4'>Service Request History</h2>
            <div className='service-cards grid grid-cols-1 gap-2'>
                {requests.map((request, index) => (
                    <Link key={index} to={`/service/${request.id}`}>
                        <RequestServiceCard request={request} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RequestHistoryPage
