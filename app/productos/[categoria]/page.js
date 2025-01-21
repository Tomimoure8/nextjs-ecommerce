const Productos = ({ params }) => {

    console.log(params);

    return (
        <div>
            <h1>Productos de la categoria {params.categoria}</h1>
        </div>
    );
}

export default Productos;