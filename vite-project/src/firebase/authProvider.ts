import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const signin = async (email: string, password:string) : Promise<any> => {
    try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const { uid, displayName, photoURL} = response.user;
    
    return {
    ok: true,
    uid, displayName, email, photoURL
    }
}
    catch (error: any) {
        return{
            ok: false,
            errorMessage: error.message,
        }
}
}