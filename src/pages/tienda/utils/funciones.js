export const verificarProductoRepetido = (carritoProductos, nuevo) => {
    let count = 0;
    let nuevo_carrito = []
    carritoProductos.map((producto, i) => {
        if (nuevo.productoId == producto.productoId) {
            count = producto.cantidad;

        } else {
            nuevo_carrito.push(producto)
        }
    })
    nuevo.cantidad = count + 1;

    nuevo_carrito.push(nuevo);
    return nuevo_carrito;
}
export const decrementaProducto = (carritoProductos, nuevo) => {
    let nuevo_carrito = []
    carritoProductos.map((producto, i) => {
        if (nuevo.productoId == producto.productoId) {
            if (producto.cantidad != 1) {
                producto.cantidad = producto.cantidad - 1;
            }
        }
        nuevo_carrito.push(producto);
    });
    return nuevo_carrito;
}

export const incrementaProducto = (carritoProductos, nuevo, stock) => {
    let nuevo_carrito = []
    carritoProductos.map((producto, i) => {
        if (nuevo.productoId == producto.productoId) {
            if (producto.cantidad < stock) {
                producto.cantidad = producto.cantidad + 1;
            }
        }
        nuevo_carrito.push(producto);
    });
    return nuevo_carrito;
}

export const deleteProducto = (carritoProductos, nuevo) => {
    let nuevo_carrito = []
    carritoProductos.map((producto, i) => {
        if (nuevo.productoId != producto.productoId) {
            nuevo_carrito.push(producto);
        }
    });
    return nuevo_carrito;
}
export const countProductos = (carritoProductos) => {
    let count = 0
    carritoProductos.map((producto, i) => {
        count += producto.cantidad
    });
    return count;
}