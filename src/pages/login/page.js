"use client";

import { useState } from "react";
import { useUserAuth } from "@/context/UserAuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Button from "@/components/Button";

export default function LoginPage() {
    const [error, setError] = useState(null);
    const { currentUser } = useUserAuth();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError(error.message);
        }
    };

    if (currentUser) {
        return <p>Ya estás autenticado. Redirigiendo...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleGoogleLogin} className="mt-4">
                Iniciar Sesión con Google
            </Button>
        </div>
    );
}