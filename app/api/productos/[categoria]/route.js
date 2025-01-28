import { NextResponse } from "next/server";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const productsCollection = collection(db, "products");
    const docRef = doc(productsCollection, id);
    const query = await getDoc(docRef);

    const producto = query.data();
    producto.id = id;

    return NextResponse.json({
        message: "Detalle de producto",
        error: false,
        payload: producto
    });
}