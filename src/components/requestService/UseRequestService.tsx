import { requestCreatorCol, useAuth } from '~/lib/firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { RequestCreator, ServiceStatus } from '~/components/types/request'

export const useRequestCreator = () => {
    // const auth = useAuth();
    // const firestore = useFirestore();
    return {
        requestCreator: async (
            sid: string, // user.uid
            uid: string,
            requestCategory: string,
            requiredHours: number,
            address: string,
            requestDescription: string,
            requestedTime: Date,
            timestamp: Date,
            status: ServiceStatus,
        ): Promise<boolean> => {
            try {
                await setDoc(
                    doc(requestCreatorCol), // will create a new document with a random ID
                    JSON.parse(
                        JSON.stringify(
                            new RequestCreator(
                                sid,
                                uid,
                                requestCategory,
                                requiredHours,
                                address,
                                requestDescription,
                                requestedTime,
                                timestamp,
                                status,
                            ),
                        ),
                    ),
                )
                return true
            } catch (error) {
                console.error('Create failed:', error)
                return false
            }
        },

        updateRequest: async (requestId: string, updates: Partial<RequestCreator>): Promise<boolean> => {
            try {
                await updateDoc(doc(requestCreatorCol, requestId), updates)
                return true
            } catch (error) {
                console.error('Update failed:', error)
                return false
            }
        },
    }
}
