import { serviceCreatorCol, useAuth } from '~/services/lib/firebase'
import { ServiceCreator } from '~/services/types/service'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

export const useServiceCreator = () => {
    // const auth = useAuth();
    // const firestore = useFirestore();
    return {
        serviceCreator: async (
            uid: string, // user.uid
            name: string,
            image: string,
            price: string,
            coverArea: string,
            time: string,
            description: string, // TODO: need a link to provider
            category: string,
        ): Promise<boolean> => {
            try {
                await setDoc(
                    doc(serviceCreatorCol), // will create a new document with a random ID
                    JSON.parse(
                        JSON.stringify(
                            new ServiceCreator(uid, name, image, price, coverArea, time, description, false, category),
                        ),
                    ),
                )
                return true
            } catch (error) {
                console.error('Create failed:', error)
                return false
            }
        },

        updateServiceCreator: async (docId: string, serviceCreator: ServiceCreator): Promise<boolean> => {
            try {
                const serviceCreatorDoc = doc(serviceCreatorCol, docId);
                await updateDoc(serviceCreatorDoc, JSON.parse(JSON.stringify(serviceCreator)));
                return true;
            } catch (error) {
                console.error('Update failed:', error);
                return false;
            }
        },
    }
}
