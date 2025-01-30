import { db } from "@/firebase/config";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Cambios: Función para obtener productos filtrados por categoría:Esta función obtiene productos filtrados por categoría desde Firestore. Si no se proporciona una categoría, se obtienen todos los productos.
async function obtenerProductosPorCategoria(categoria) {
    const productsCollection = collection(db, "products");
    const filtro = query(productsCollection, where("category", "==", categoria));
    const snapshot = await getDocs(categoria ? filtro : productsCollection);

    return snapshot.docs.map((documentRef) => {
        const id = documentRef.id;
        const productoData = documentRef.data();
        productoData.id = id;
        return productoData;
    });
}

// Cambios: Función para manejar errores: Esta función maneja los errores y devuelve una respuesta JSON con un mensaje de error.
function manejarError(mensaje) {
    return NextResponse.json({
        message: mensaje,
        error: true,
        payload: null
    });
}
// Cambios: Función GET: Esta función maneja las solicitudes GET para obtener productos. Utiliza la función obtenerProductosPorCategoria para obtener los productos y devuelve una respuesta JSON con los productos obtenidos.
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const categoria = searchParams.get("categoria");

    try {
        const productosFinales = await obtenerProductosPorCategoria(categoria);

        return NextResponse.json({
            message: "Productos obtenidos con éxito",
            error: false,
            payload: productosFinales
        });
    } catch (error) {
        return manejarError("Error al obtener los productos");
    }
}
// Función POST: Esta función maneja las solicitudes POST para agregar nuevos productos a Firestore. Utiliza addDoc para agregar el producto a la colección products y devuelve una respuesta JSON indicando el éxito o el error de la operación.
export async function POST(req) {
    const producto = await req.json();

    try {
        const productsCollection = collection(db, "products");
        await addDoc(productsCollection, { ...producto });

        return NextResponse.json({
            message: "Producto creado con éxito",
            error: false,
            payload: null
        });
    } catch (error) {
        return manejarError("Error al crear el producto");
    }
}


