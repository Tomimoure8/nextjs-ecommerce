import PageTitle from "../../src/components/products/PageTitle";
import Link from "next/link";

export const metadata = {
    title: "Productos",
}


export default function ProductLayout({ children }) {

    const categorias = [
        { id: 1, name: "chargers" },
        { id: 2, name: "accessories" },
        { id: 3, name: "notebooks" },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="min-w-[250px]">
                <PageTitle>Filtros</PageTitle>
                <div className="flex flex-col gap-4">
                    <Link href="/products">Todos</Link>
                    {categorias.map((categoria) => (
                        <Link key={categoria.id} href={`/products/${categoria.name}`}>{categoria.name}</Link>
                    ))}
                </div>
            </aside>
            <div className="grow">
                {children}
            </div>
        </div>
    );
}