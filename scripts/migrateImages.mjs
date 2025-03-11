// scripts/migrateImages.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../src/lib/firebase"; // Ajusta la ruta según tu estructura

async function migrateImages() {
    try {
        const storage = getStorage();
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);

        for (const documentRef of snapshot.docs) {
            const productId = documentRef.id;
            const productData = documentRef.data();
            const imageUrl = productData.image; // URL de snpi.dell.com, por ejemplo, "https://snpi.dell.com/snp/images/products/large/en-us~492-BDBV_v2/492-BDBV_v2.jpg"

            if (imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("https://snpi.dell.com")) {
                console.log(`Procesando imagen para el producto ${productId}: ${imageUrl}`);

                // Descargar la imagen
                const response = await fetch(imageUrl);
                if (!response.ok) {
                    console.error(`No se pudo descargar la imagen para ${productId}: ${response.statusText}`);
                    continue;
                }
                const blob = await response.blob();

                // Crear una referencia en Firebase Storage (usando el nombre del producto o ID)
                const fileName = imageUrl.split('/').pop() || `product_${productId}.jpg`; // Extrae el nombre del archivo o usa el ID
                const storageRef = ref(storage, `products/${fileName}`);

                // Subir la imagen
                await uploadBytes(storageRef, blob);
                console.log(`Imagen subida a Firebase Storage para ${productId}`);

                // Obtener la URL pública
                const firebaseUrl = await getDownloadURL(storageRef);
                console.log(`URL pública generada: ${firebaseUrl}`);

                // Actualizar Firestore con la nueva URL
                const productRef = doc(db, "products", productId);
                await updateDoc(productRef, {
                    image: firebaseUrl
                });
                console.log(`Campo image actualizado en Firestore para el producto ${productId}`);
            } else {
                console.log(`No se procesó la imagen para ${productId}: URL inválida o no de snpi.dell.com`);
            }
        }

        console.log("Migración de imágenes completada con éxito");
    } catch (error) {
        console.error("Error durante la migración de imágenes:", error);
    }
}

// Ejecutar el script
migrateImages();