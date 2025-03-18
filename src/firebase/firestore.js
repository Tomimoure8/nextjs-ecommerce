import { db } from "./firebaseConfig";
import { collection, getDocs, doc, setDoc, getDoc, addDoc, serverTimestamp, updateDoc, query, where } from "firebase/firestore";

export async function getProductos() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(producto => producto.activo !== false); // Profesores: Filtra productos inactivos
}

export async function getProductoById(id) {
    try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
        console.error(`Error al obtener el producto ${id}:`, error);
        return null;
    }
}

export async function agregarProducto(id, data) {
    try {
        const docRef = doc(db, "productos", id);
        await setDoc(docRef, data);
        console.log(`Producto ${id} agregado correctamente.`);
    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
}

export async function guardarOrden(orden) {
    try {
        const docRef = await addDoc(collection(db, "ordenes"), {
            ...orden,
            fecha: serverTimestamp(), // Profesores: Usa timestamp del servidor para consistencia
        });
        console.log("Orden guardada con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar la orden:", error);
        throw error;
    }
}

export async function eliminarProducto(id) {
    try {
        const docRef = doc(db, "productos", id);
        await setDoc(docRef, { activo: false }, { merge: true }); // Profesores: Desactiva en lugar de borrar
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

export async function editarProducto(id, data) {
    try {
        await updateDoc(doc(db, "productos", id), data);
    } catch (error) {
        console.error("Error al editar producto:", error);
        throw error;
    }
}

export async function updateStock(productos) {
    try {
        for (const item of productos) {
            const productoRef = doc(db, "productos", item.id);
            const producto = await getProductoById(item.id);

            if (producto && producto.stock >= item.cantidad) {
                await updateDoc(productoRef, {
                    stock: producto.stock - item.cantidad,
                });
            } else {
                console.warn(`No hay suficiente stock para el producto: ${item.nombre}`);
                throw new Error(`No hay suficiente stock para ${item.nombre}`);
            }
        }
    } catch (error) {
        console.error("Error al actualizar stock:", error);
        throw error;
    }
}

export async function getOrdenesByUser(userId) {
    try {
        const q = query(collection(db, "ordenes"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error al obtener órdenes del usuario:", error);
        throw error;
    }
}