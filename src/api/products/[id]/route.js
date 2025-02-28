import { NextResponse } from "next/server";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function GET(request, { params }) {
    const { id } = params;
    // El ID del producto se obtiene de los parámetros de la ruta (params.id), a diferencia del código anterior donde el ID del producto se obtiene de los parámetros de búsqueda en la URL (searchParams.get("id"), haciendo esta nueva incorporación más intuitiva y fácil de entender.

    //La función GET toma dos parámetros (request y { params }), lo que permite acceder a los parámetros de la ruta directamente, cuando antes solo tomaba request.

    const productsCollection = collection(db, "products");
    const docRef = doc(productsCollection, id);
    const query = await getDoc(docRef);

    if (!query.exists()) {
        return NextResponse.json({
            message: "Producto no encontrado",
            error: true,
            payload: null
        }, { status: 404 });
    }
    // En este bloque de código se verifica si el producto existe en la base de dato (if (!query.exists())). Si no existe, se devuelve un mensaje de error y un estado 404. Antes de esto no se verificaba si el documento existía antes de acceder a los datos, lo que podía causar un error si el documento no existía.

    const producto = query.data();
    producto.id = id;

    return NextResponse.json({
        message: "Detalle de producto",
        error: false,
        payload: producto
    });
}
