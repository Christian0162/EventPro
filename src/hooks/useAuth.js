import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

export default function useAuth() {

    const login = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password);
    }

    const logout = (auth) => {
        signOut(auth)
    }

    const register = (auth, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    return {
        login,
        logout,
        register
    }
}