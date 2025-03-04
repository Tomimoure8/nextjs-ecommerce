import { getProductByIdFromServer } from "@/actions/getProductByIdFromServer";
import { getProductsFromServer } from "@/actions/getProductsFromServer";
import AddToCartButton from "@/components/products/AddToCartButton";;
import PageTitle from "../../../src/components/products/PageTitle";
import Link from "next/link";
import Image from "next/image";

export const generateMetadata = async ({ params }) => {
    const { id } = await params
    const { payload: producto } = await getProductByIdFromServer(id)

    return {
        title: producto.name
    }
}



export const generateStaticParams = async () => {
    const params = await getProductsFromServer()
    return params.payload.map((product) => ({ id: product.id }));
}


export default async function ProductDetailsPage({ params }) {

    const { id } = await params
    const { payload: producto, error } = await getProductByIdFromServer(id)

    if (error) {
        return (
            <>
                <PageTitle>Producto no encontrado</PageTitle>
                <p>El producto con id {id} no existe, intentalo de nuevo</p>
                <Link href="/products">Volver a productos</Link>
            </>
        )
    }

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image
                            alt={producto.name}
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={producto.image || "https://placehold.co/600x400?text=Imagen+No+Encontrada"}
                            width={400}
                            height={400}
                            onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Imagen+No+Encontrada"; console.error("Error al cargar la imagen:", e); }}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{producto.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{producto.name}</h1>
                            <p className="leading-relaxed">{producto.description}</p>
                            <div className="flex mb-6">
                                <span className="title-font font-medium text-2xl text-gray-900">${producto.price}</span>
                            </div>
                            <AddToCartButton producto={producto} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}