'use client';

const MenuCategorias = ({ categorias, onSelectCategoria }) => {
    return (
        <nav className="w-1/4 p-4 bg-gray-100 border border-gray-300">
            <h2 className="text-2xl font-bold mb-4">Categorías</h2>
            <ul className="space-y-2">
                {categorias.map((categoria) => (
                    <li key={categoria}>
                        <button
                            onClick={() => onSelectCategoria(categoria)}
                            className="text-teal-500 hover:text-teal-700"
                        >
                            {categoria}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MenuCategorias;