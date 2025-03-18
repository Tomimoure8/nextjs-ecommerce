"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Profesores: Rol hardcodeado para admin, resto son usuarios
                setRole(currentUser.email === "admin@emiliospizza.com" ? "admin" : "user");
            } else {
                setRole("guest"); // Evita null para consistencia en verificaciones
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        setUser(null);
        setRole(null);
        return signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, role, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
