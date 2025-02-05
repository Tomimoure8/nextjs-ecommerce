- **ProductosCategoriaCliente:**
  - El código que manejamos en ProductosCategoriaCliente es repetitivo si ya tenemos funcionalidad similar cubierta en el código de la API. 
  - El componente del cliente solo necesita hacer una solicitud a la API y manejar la respuesta, sin necesidad de filtrar datos.

- **ProductsLoader, ProductListSection y ProductListContainer**
  - Estos componentes aportan una mejor estructura y manejo de lógica de productos.
  - A diferencia del profesor, utilicé Array.from en     ProductsLoader para mejorar la comprensión y reducir la duplicación de código.

- **ProductosCategoriaCliente y MenuCategorias**
  - Elimine ProductosCategoriaCliente porque los nuevos componentes (ProductListSection y ProductListContainer) cubren la lógica de obtención y manejo de productos de manera más organizada y eficiente.
  - Mantengo MenuCategorias porque este componente proporciona una UI específica para seleccionar categorías, lo cual es esencial para la funcionalidad del ecommerce. No hay un equivalente directo en los nuevos componentes que cubra esta funcionalidad de manera tan específica. *Prestar atención a esto a medida que añadimos archivos*.

- **app/products/[cat]/page.js**
  - Se agrego este archivo porque es responsable de estructurar y manejar la sección de productos. Este archivo es un buen lugar para ProductListSection y ProductListContainer.

- **app/products/page.js**
  - Se agrego este archivo porque se enfoca en renderizar el título de la página y la sección de productos con ProductListSection.

- **app/product/[id]/page.js**
  - Este archivo se agrego porque se encarga de mostrar los detalles de un producto específico basado en su ID. Utiliza acciones para obtener datos del producto desde el servidor. Muestra información detallada de un producto, incluyendo su nombre, descripción, precio, y opciones de variación como color y tamaño. *Aún no lo he visto porque los productos no cargan y necesito que lo hagan para ver los detalles. Así que cuando carguen, tendré que darle un estilo único porque tiene el que el profe le dio. También debo verificar si puedo cambiar algo para que el código no sea igual.*

- **components/products/Loading**
  - Se añadio Loading. El componente Loading utiliza la librería react-loading-skeleton para mostrar un esqueleto de carga mientras se están obteniendo los datos. Esto mejora la experiencia del usuario al proporcionar una indicación visual de que el contenido está cargando.

- **app/productos/[categoria]/page.js**
  - Se eliminó app/productos/[categoria]/page.js, ya que su funcionalidad es redundante y está cubierta de manera más eficiente por los nuevos componentes.

- **app/products/layout.js**  
  - Proporciona enlaces a diferentes categorías de productos (Living y Dormitorio).
  - Incluye un enlace para ver todos los productos (/products).
  - Sirve como layout para organizar la navegación y presentación de productos, complementando la funcionalidad de app/products/page.js.

- **ProductList**
  -Se añade validación de las propiedades pasadas al componente para asegurar que se utilicen correctamente.

  



