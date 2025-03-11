"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProtectedRoute from "../../components/ProtectedRoute";

const AdminContactPage = () => {
    const { currentUser } = useUserAuth();
    const router = useRouter();
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        const fetchMensajes = async () => {
            const mensajesRef = collection(db, "contactMessages");
            const snapshot = await getDocs(mensajesRef);
            const mensajesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMensajes(mensajesList);
        };

        fetchMensajes();
    }, []);

    if (!currentUser) return <p>Cargando...</p>;

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Panel de Administración de Contacto</h1>
                <p>Bienvenido, {currentUser.displayName || "usuario"}.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Mensajes de Contacto</h2>
                        <p>Administra los mensajes enviados desde el formulario de contacto.</p>

                        <ul className="mt-4">
                            {mensajes.length > 0 ? (
                                mensajes.map((mensaje) => (
                                    <li key={mensaje.id} className="mb-2">
                                        <Link href={`/admin/contacto/editar/${mensaje.id}`} className="text-blue-500 hover:underline">
                                            Ver {mensaje.name || "mensaje"}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>No hay mensajes disponibles.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminContactPage;