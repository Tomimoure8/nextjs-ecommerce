export async function getProducts(categoria) {
    try {
        const params = new URLSearchParams(categoria ? { categoria } : {});
        const url = `http://localhost:3000/api/products?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { payload: products } = await response.json();

        return {
            payload: products,
            message: "Se obtuvieron los productos",
            error: false
        };
    } catch (error) {
        return {
            payload: null,
            message: `No se pudieron obtener los productos: ${error.message}`,
            error: true
        };
    }
}
