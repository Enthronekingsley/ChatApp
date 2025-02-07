import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
    user: any;
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => Promise<{ success: boolean, msg?: string }>;
    logout: () => Promise<{ success: boolean, msg?: string }>
    register: (email: string, password: string, username: string, profileUrl: string) => Promise<{success: boolean, msg?: string}>;
}

export const AuthContextProvider = ({ children } : any) => {

    const [user, setUser] = useState<any>(null);
    const[isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            }else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsubscribe;
    }, []);

    const updateUserData = async (userId: any) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    }

    const register = async (email: string, password: string, username: string, profileUrl: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                profileUrl,
                userId: response.user.uid
            })
            return { success: true, data: response.user }
        }catch (error) {
            let msg = (error as any).message;

            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email address.";
            if (msg.includes("(auth/email-already-in-use)")) msg = "Email is already in use.";
            if (msg.includes("(auth/weak-password)")) msg = "Password should be at least 6 characters.";
            if (msg.includes("(auth/admin-restricted-operation)")) msg = "Restricted operation. Please check your Firebase rules or configurations.";

            return { success: false, msg };
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { success: true, data: response.user }
        }catch (error) {
            let msg = (error as any).message;

            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email address.";
            if (msg.includes("(auth/wrong-password)")) msg = "Incorrect password.";
            if (msg.includes("(auth/user-not-found)")) msg = "User not found.";
            if (msg.includes("(auth/invalid-credential)")) msg = "Invalid credentials.";
            if (msg.includes("(auth/admin-restricted-operation)")) msg = "Restricted operation. Please check your Firebase rules or configurations.";

            return { success: false, msg };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setUser(null)

            return { success: true };
        }catch (error: any) {
            return { success: false, msg: error.message, e: error };
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider")
    }
    return value
}