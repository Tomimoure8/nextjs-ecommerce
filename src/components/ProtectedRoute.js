"use client";

import { useUserAuth } from "../../src/context/UserAuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useUserAuth();
    const router = useRouter();

    if (!currentUser) {
        router.push("/login");
        return <p>Cargando...</p>;
    }

    return children;
}