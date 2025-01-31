- **ProductosCategoriaCliente:**
  - El código que manejamos en ProductosCategoriaCliente es repetitivo si ya tenemos funcionalidad similar cubierta en el código de la API. 
  - El componente del cliente solo necesita hacer una solicitud a la API y manejar la respuesta, sin necesidad de filtrar datos.

- **ProductsLoader, ProductListSection y ProductListContainer**
  - Estos componentes aportan una mejor estructura y manejo de lógica de productos.
  - A diferencia del profesor, utilicé Array.from en     ProductsLoader para mejorar la comprensión y reducir la duplicación de código.

- **ProductosCategoriaCliente y MenuCategorias**
  - Elimine ProductosCategoriaCliente porque los nuevos componentes (ProductListSection y ProductListContainer) cubren la lógica de obtención y manejo de productos de manera más organizada y eficiente.
  - Mantengo MenuCategorias porque este componente proporciona una UI específica para seleccionar categorías, lo cual es esencial para la funcionalidad del ecommerce. No hay un equivalente directo en los nuevos componentes que cubra esta funcionalidad de manera tan específica. *Prestar atención a esto a medida que añadimos archivos*.
