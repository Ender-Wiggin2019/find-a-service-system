import {requestCreatorCol, useAuth} from "~/lib/firebase";
import {doc, setDoc} from "firebase/firestore";
import {RequestCreator, ServiceStatus} from "~/components/types/request";

export const useRequestCreator = () => {
    // const auth = useAuth();
    // const firestore = useFirestore();
    return {
        requestCreator: async (
            sid: string, // user.uid
            uid: string,
            requestDescription: string,
            requestedTime: Date,
            timestamp: Date,
            status: ServiceStatus,
        ): Promise<boolean> => {
            try {
                await setDoc(doc(requestCreatorCol), // will create a new document with a random ID
                    JSON.parse(JSON.stringify(new RequestCreator(sid, uid, requestDescription, requestedTime, timestamp, status)))
                );
                return true;
            } catch (error) {
                console.error("Create failed:", error);
                return false;
            }
        },
    };
};