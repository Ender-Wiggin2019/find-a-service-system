import {notificationColFactory, requestCreatorCol, useAuth} from '~/services/lib/firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { RequestCreator, ServiceStatus } from '~/services/types/request'
import {createWaitingForCommentMessage} from "~/services/types/message";

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
                                0, // initial state is 0
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
                const requestDocRef = doc(requestCreatorCol, requestId);

                const requestDocSnap = await getDoc(requestDocRef);
                const requestData = requestDocSnap.data();

                if (requestData && !('completeCheck' in requestData)) {
                    await updateDoc(requestDocRef, { completeCheck: 0 } as Partial<RequestCreator>);
                }

                // if the request should be completed
                if (updates.status === ServiceStatus.COMPLETED) {
                    const completeCheck = requestData && requestData.completeCheck ? requestData.completeCheck + 1 : 1;
                    if (completeCheck >= 1) {
                        await updateDoc(requestDocRef, updates);
                        if (requestData && requestData.uid && requestData.sid) {
                            await setDoc(
                                doc(notificationColFactory(requestData.uid)), // will create a new document with a random ID
                                createWaitingForCommentMessage(requestData),
                            )
                        }
                    }
                    await updateDoc(requestDocRef, {
                        completeCheck: completeCheck,
                    } as Partial<RequestCreator>);
                } else {
                    // else just update
                    await updateDoc(requestDocRef, updates);
                }

                // no matter what, update the time
                // FIXME: data type is not correct
                // await updateDoc(requestDocRef, {
                //     // timestamp: new Date().toISOString(),
                //
                // } as Partial<RequestCreator>);

                return true;
            } catch (error) {
                console.error('Update failed:', error);
                return false;
            }
        },

    }
}
