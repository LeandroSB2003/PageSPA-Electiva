import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc } from "firebase/firestore";

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

    await updateProfile(response.user, { displayName: name, photoURL: avatarID });

    const userRef = doc(db, "scoringHistory", email);
    await setDoc(userRef, {
      Name: name,
      Wins: 0,
      photoURL: avatarID,
    });

    return {
      ok: true,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
}

}

export const signOut = async (): Promise<any> => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }    

}