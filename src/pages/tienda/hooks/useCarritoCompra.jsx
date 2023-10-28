export const useCarritoCompra = () => {

    const GetGroupProducto = (productos) => {
        let result = [];
        let deleteDuplicado = DeleteDuplicateProducto(productos);
        deleteDuplicado.map((item, i) => {
            let precio = 0
            productos.map((aux) => {
                if (item.productoId === aux.productoId) {
                    //sumar precio
                    precio = precio + aux.precioVentaMax
                }
            })
            item.precioVentaMax = precio; // añadir cantidad
            result.push(item)
        })
        return result;
    }
    const DeleteDuplicateProducto = (productos) => {
        let result = productos.filter(
            (person, index) => index === productos.findIndex(
                other => person.productoId === other.productoId
            ));
        return result;
    }

    return {
        GetGroupProducto
    }
}