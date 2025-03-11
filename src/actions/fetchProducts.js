export async function fetchProducts(category) {
    try {
        const params = new URLSearchParams(category ? { category } : {});
        const url = `http://localhost:3000/api/products?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { payload: products, message, error } = await response.json();

        return {
            payload: products.map(product => ({
                ...product,
                image: product.image || "https://placehold.co/600x400?text=No+Image"
            })),
            message: message || "Se obtuvieron los productos",
            error: error || false
        };
    } catch (error) {
        return {
            payload: null,
            message: `No se pudieron obtener los productos: ${error.message}`,
            error: true
        };
    }
}
