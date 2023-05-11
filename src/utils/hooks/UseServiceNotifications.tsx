import { useState, useEffect } from 'react'
import { db } from '~/services/lib/firebase'
import { doc, getDocs, collection, query, where, addDoc } from 'firebase/firestore'
import { IService } from '~/services/types/service'
import { createNewServiceMessage, updateServiceMessage, Message, MessageStatus } from '~/services/types/message'

export const useServiceNotifications = (service: IService, messageType: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchServiceNotifications = async () => {
            setLoading(true)
            setError(false)
            try {
                const requestsCollection = collection(db, `request`)
                const q = query(requestsCollection, where('serviceId', '==', service.id))
                const requestSnapshot = await getDocs(q)

                // Get unique uids
                const uidSet = new Set<string>()
                requestSnapshot.forEach((doc) => {
                    uidSet.add(doc.data().uid)
                })

                const uniqueUids = Array.from(uidSet)

                // Create new service message
                const newMessage =
                    messageType === 'new'
                        ? createNewServiceMessage(service.id, service.service.name)
                        : updateServiceMessage(service.id, service.service.name)

                // Add new message to each user's notifications collection
                for (const uid of uniqueUids) {
                    const userNotificationsCollection = collection(db, `user/${uid}/notifications`)
                    await addDoc(userNotificationsCollection, newMessage)
                }
            } catch (err) {
                setError(true)
                console.error('Error fetching service notifications:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchServiceNotifications()
    }, [service])

    return { loading, error }
}
