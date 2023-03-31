import {serviceCreatorCol, useAuth} from "~/lib/firebase";
import {ServiceCreator} from "~/components/types/service";
import {doc, setDoc} from "firebase/firestore";

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
        ): Promise<boolean> => {
            try {
                await setDoc(doc(serviceCreatorCol, uid),
                    JSON.parse(JSON.stringify(new ServiceCreator(name, image, price, coverArea, time, description)))
                );
                return true;
            } catch (error) {
                console.error("Create failed:", error);
                return false;
            }
        },
    };
};
