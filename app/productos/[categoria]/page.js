export async function generateMetadata({params}) {
    const { categoria } = params;
    return {
        title: `Productos de la categoria ${params.categoria} - ecommerce-platform`,
    };
}
const Productos = ({ params }) => {

    console.log(params);

    return (
        <div>
            <h1>Productos de la categoria {params.categoria}</h1>
        </div>
    );
}

export default Productos;