import { db } from "../../lib/firebase";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


async function fetchProductsByCategory(categoria) {
    const productsCollection = collection(db, "products");
    const filtro = query(productsCollection, where("category", "==", categoria));
    const snapshot = await getDocs(categoria ? filtro : productsCollection);

    return snapshot.docs.map((documentRef) => {
        const id = documentRef.id;
        const productData = documentRef.data();
        return {
            id,
            ...productData,
            image: productData.image || "https://ejemplo.com/default-image.jpg"
        };
    });
}


function handleError(mensaje, error) {
    console.error(error);
    return NextResponse.json({
        message: mensaje,
        error: true,
        payload: null
    });
}

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    try {
        const finalProducts = await fetchProductsByCategory(category);

        return NextResponse.json({
            message: "Productos obtenidos con éxito",
            error: false,
            payload: finalProducts
        });
    } catch (error) {
        return handleError("Error al obtener los productos", error);
    }
}

export async function POST(req) {
    const product = await req.json();

    try {
        const productsCollection = collection(db, "products");
        await addDoc(productsCollection, { ...product });

        return NextResponse.json({
            message: "Producto creado con éxito",
            error: false,
            payload: null
        });
    } catch (error) {
        return handleError ("Error al crear el producto", error);
    }
}


