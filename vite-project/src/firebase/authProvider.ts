import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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

export const register = async (name: string, email: string, password: string, avatarID: string): Promise<any> => {
    try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(response.user, {displayName: name, photoURL: avatarID});
    
    return {
    ok: true
    }
}
    catch (error: any) {
        return{
            ok: false,
            errorMessage: error.message,
        }
}
}