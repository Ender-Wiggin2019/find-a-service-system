import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '~/services/lib/firebase';
import { Message } from '~/services/types/message';

const useUserNotifications = (userId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [notifications, setNotifications] = useState<Message[]>([]);

    useEffect(() => {
        const fetchUserNotifications = async () => {
            setLoading(true);
            setError(false);
            try {
                const notificationsCollection = collection(db, `customer/${userId}/notification`);
                const q = query(notificationsCollection, orderBy('time', 'desc'));
                const notificationsSnapshot = await getDocs(q);
                const notificationsData: Message[] = notificationsSnapshot.docs.map((doc) => doc.data() as Message);
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
    }, [userId]);

    return { loading, error, notifications };
};
