import { commentColFactory, db } from '~/services/lib/firebase'
import { Comment } from '~/services/types/service'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { FirebasePath } from '~/services/lib/constants'
export const useCommentCreator = () => {
    // const auth = useAuth();
    // const firestore = useFirestore();
    return {
        commentCreator: async (
            serviceId: string,
            comment: Comment, // TODO: need a link to provider
        ): Promise<boolean> => {
            try {
                await setDoc(
                    doc(commentColFactory(serviceId)), // will create a new document with a random ID
                    comment,
                )
                const serviceDoc = await getDoc(doc(db, FirebasePath.SERVICE, serviceId))
                if (serviceDoc.exists()) {
                    const providerDoc = await getDoc(doc(db, FirebasePath.SERVICE_PROVIDER, serviceDoc.data().uid))
                    if (providerDoc.exists()) {
                        await updateDoc(doc(db, FirebasePath.SERVICE_PROVIDER, serviceDoc.data().uid), {
                            commentCount: providerDoc.data().commentCount + 1,
                            rating:
                                (providerDoc.data().rating * providerDoc.data().commentCount + comment.rating) /
                                (providerDoc.data().commentCount + 1),
                        })
                    }
                }
                return true
            } catch (error) {
                console.error('Create failed:', error)
                return false
            }
        },
    }
}
