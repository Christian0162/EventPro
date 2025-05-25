import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useAuth() {

    const login = async (auth, email, password) => {
       await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = (auth) => {
        return signOut(auth)
    }

    const register = async (auth, email, password, firstName, lastName, role, setErrorEmail) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            
            const user = userCredential.user.uid

            await setDoc(doc(db, "Users", user), {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    role: role,
                    isApproved: false,
                })

        }
        catch (e) {
            if (e.code === "auth/email-already-in-use") {
                setErrorEmail("The email is already exist.");
            }
            else { setErrorEmail('') }
        }
    }

    return {
        login,
        logout,
        register
    }
}