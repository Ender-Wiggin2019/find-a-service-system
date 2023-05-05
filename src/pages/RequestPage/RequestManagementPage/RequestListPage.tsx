import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import RequestManagementCard from '~/components/Card/RequestManagementCard'
import { Service, Comment } from '~/services/types/service'
import { ServiceProvider } from '~/services/types/user'
import { db } from '~/services/lib/firebase'
import { FirebasePath } from '~/services/lib/constants'
import { IRequest, RequestCreator, ServiceStatus } from '~/services/types/request'
import { useAuthState, useSignOut } from '~/utils/hooks/UserContext'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { BoxProps } from '@mui/material'
import { useTheme } from '@mui/material'
import dayjs from 'dayjs'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

type RequestListProps = {
    serviceId: string
}

// interface RequestStatus {
//     requested: "requested",
//     accepted: "accepted",
//     declined: "declined",
//     needMoreInfo: "needMoreInfo",
//     completed: "completed",
// }

interface IRequestLists {
    requested: Array<IRequest>
    accepted: Array<IRequest>
    needMoreInfo: Array<IRequest>
    declined: Array<IRequest>
    completed: Array<IRequest>
}

const RequestList: React.FC<RequestListProps> = ({ serviceId }) => {
    const { state } = useAuthState()
    const [value, setValue] = React.useState(0)
    // const [requests, setRequests] = useState<IRequest[]>([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('coverArea')
    const [requestLists, setRequestLists] = useState<IRequestLists>({
        requested: [],
        accepted: [],
        needMoreInfo: [],
        declined: [],
        completed: [],
    })

    useEffect(() => {
        const fetchRequests = async () => {
            if (state.state === 'SIGNED_IN') {
                const requestCollection = collection(db, FirebasePath.REQUEST)
                const q = query(requestCollection, where('sid', '==', serviceId))
                const requestSnapshot = await getDocs(q)

                const tempRequestLists: IRequestLists = {
                    requested: [],
                    accepted: [],
                    needMoreInfo: [],
                    declined: [],
                    completed: [],
                }

                await Promise.all(
                    requestSnapshot.docs.map(async (singleDoc) => {
                        const data = singleDoc.data()

                        const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, data.sid))
                        const serviceData = serviceDoc.data()

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
                                const requestData = {
                                    request: new RequestCreator(
                                        data.sid,
                                        data.uid,
                                        data.requestCategory,
                                        data.requiredHours,
                                        data.address,
                                        data.requestDescription,
                                        dayjs(data.requestedTime).toDate(),
                                        dayjs(data.timestamp).toDate(),
                                        data.status,
                                        data.completeCheck ? data.completeCheck : 0,
                                    ),
                                    id: singleDoc.id,
                                    service: serviceDetail,
                                }
                                switch (data.status) {
                                    case ServiceStatus.REQUESTED:
                                        tempRequestLists.requested.push(requestData as IRequest)
                                        break
                                    case ServiceStatus.ACCEPTED:
                                        tempRequestLists.accepted.push(requestData)
                                        break
                                    case ServiceStatus.DECLINED:
                                        tempRequestLists.declined.push(requestData)
                                        break
                                    case ServiceStatus.NEED_MORE_INFO:
                                        tempRequestLists.needMoreInfo.push(requestData)
                                        break
                                    case ServiceStatus.COMPLETED:
                                        tempRequestLists.completed.push(requestData)
                                        break
                                    case ServiceStatus.FINISHED_COMMENT: // this one is also completed
                                        tempRequestLists.completed.push(requestData)
                                        break
                                    default:
                                        break
                                }
                            }
                        }
                    }),
                )
                setRequestLists(tempRequestLists)
            }
        }
        fetchRequests()
    }, [state])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
    }

    console.log(Object.keys(requestLists))

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant='fullWidth' aria-label='tabs'>
                    <Tab
                        label={`Request (${requestLists.requested.length})`}
                        id='simple-tab-0'
                        aria-controls='simple-tabpanel-0'
                    />
                    <Tab
                        label={`Accepted (${requestLists.accepted.length})`}
                        id='simple-tab-1'
                        aria-controls='simple-tabpanel-1'
                    />
                    <Tab
                        label={`Waiting (${requestLists.needMoreInfo.length})`}
                        id='simple-tab-2'
                        aria-controls='simple-tabpanel-2'
                    />
                    <Tab
                        label={`Declined (${requestLists.declined.length})`}
                        id='simple-tab-3'
                        aria-controls='simple-tabpanel-3'
                    />
                    <Tab
                        label={`Completed (${requestLists.completed.length})`}
                        id='simple-tab-4'
                        aria-controls='simple-tabpanel-4'
                    />
                </Tabs>
            </Box>
            {Object.keys(requestLists).map((status, index) => {
                console.log('1', status, requestLists[status as keyof IRequestLists].length)
                return (
                    <TabPanel value={value} index={index} key={status}>
                        <div className='service-cards grid grid-cols-1 gap-2'>
                            {requestLists[status as keyof IRequestLists].map((request, index) => {
                                console.log('2', status, index, request.request.status)
                                return (
                                    // <Link key={index} to={`/service/${request.id}`}>
                                    <RequestManagementCard key={index} request={request} />
                                    // </Link>
                                )
                            })}
                        </div>
                    </TabPanel>
                )
            })}
        </Box>
    )
}

export default RequestList
