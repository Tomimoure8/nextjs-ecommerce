import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function getProductByIdFromServer(productId) {
    try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return {
                payload: null,
                message: `Producto con ID ${productId} no encontrado`,
                error: true
            };
        }

        const productData = docSnap.data();
        let imageUrl = productData.image || null;

        if (imageUrl && typeof imageUrl === "string" && !imageUrl.startsWith("http")) {
            const storage = getStorage();
            const imageRef = ref(storage, imageUrl);
            imageUrl = await getDownloadURL(imageRef);
        }

        const product = { id: docSnap.id, ...productData, image: imageUrl };

        return {
            payload: product,
            message: "Producto obtenido con éxito",
            error: false
        };
    } catch (error) {
        return {
            payload: null,
            message: `Error al obtener el producto: ${error.message}`,
            error: true
        };
    }
}