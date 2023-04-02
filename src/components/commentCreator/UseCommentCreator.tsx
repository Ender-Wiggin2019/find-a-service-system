import {commentColFactory} from "~/lib/firebase";
import {Comment} from "~/components/types/service";
import {doc, setDoc} from "firebase/firestore";
export const useCommentCreator = () => {
    // const auth = useAuth();
    // const firestore = useFirestore();
    return {
        commentCreator: async (
            serviceId: string,
            comment: Comment // TODO: need a link to provider
        ): Promise<boolean> => {
            try {
                await setDoc(doc(commentColFactory(serviceId)), // will create a new document with a random ID
                    comment
                );
                return true;
            } catch (error) {
                console.error("Create failed:", error);
                return false;
            }
        },
    };
};
