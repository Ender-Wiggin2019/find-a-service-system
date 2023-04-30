import { useState, useEffect } from 'react';
import { doc, updateDoc, collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '~/services/lib/firebase';
import { Message, IMessage, MessageStatus } from '~/services/types/message';

export const useUserNotifications = (userId: string, statusFilter: MessageStatus[]) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [notifications, setNotifications] = useState<IMessage[]>([]);

    useEffect(() => {
        const fetchUserNotifications = async () => {
            setLoading(true);
            setError(false);
            try {
                const notificationsCollection = collection(db, `customer/${userId}/notification`);
                let q = query(notificationsCollection, orderBy('time', 'desc'));

                if (statusFilter.length > 0) {
                    q = query(
                        notificationsCollection,
                        where('status', 'in', statusFilter),
                        orderBy('time', 'desc')
                    );
                }

                const notificationsSnapshot = await getDocs(q);
                const notificationsData: IMessage[] = notificationsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    message: doc.data() as Message,
                }));
                setNotifications(notificationsData);
            } catch (err) {
                setError(true);
                console.error('Error fetching user notifications:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserNotifications();
        }
    }, [userId, JSON.stringify(statusFilter)]);


    return { loading, error, notifications };
};

export const updateMessageStatus = async (
    userId: string,
    messageObj: IMessage,
    newStatus: MessageStatus
) => {
    try {
        const messageDocRef = doc(db, `customer/${userId}/notification/${messageObj.id}`);
        await updateDoc(messageDocRef, { status: newStatus } as Partial<IMessage>);
        return true;
    } catch (error) {
        console.error('Error updating message status:', error);
        return false;
    }
};

