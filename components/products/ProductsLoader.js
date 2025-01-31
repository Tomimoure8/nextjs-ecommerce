import Loading from "./Loading";

function ProductsLoader() {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <Loading key={index} className="aspect-[1/1.15]" />
            ))}
        </>
    );
}

export default ProductsLoader;
