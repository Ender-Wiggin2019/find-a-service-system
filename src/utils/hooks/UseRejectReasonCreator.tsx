import { db } from '~/services/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { FirebasePath } from '~/services/lib/constants'
import { ServiceProviderStatus } from '~/services/types/user'

export const useRejectReasonCreator = () => {
    return {
        reasonCreator: async (uid: string, reason: string): Promise<boolean> => {
            try {
                await updateDoc(
                    doc(db, FirebasePath.SERVICE_PROVIDER, uid), // will create a new document with a random ID
                    { status: ServiceProviderStatus.REJECTED, rejectReason: reason },
                )
                return true
            } catch (error) {
                console.error('Create failed:', error)
                return false
            }
        },
    }
}
