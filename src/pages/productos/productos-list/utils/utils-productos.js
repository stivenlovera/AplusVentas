export const searchByProductos = (listData, searchValue) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter(item => item.nombreClasificacion.toLocaleLowerCase().match(searchValue.toLowerCase()));
    return searchResult;
  } else {
    return listData;
  }
};
export const getRoute = pathname => {
  const str = pathname.split("/");
  return `/${str[1]}`;
};

export const initialStateProducto = {
  productoId: 0,
  codigoProducto: '',
  codigoBarra: '',
  nombreProducto: '',
  nombreProductoMaestro: '',
  productoMaestro: {
    productoMaestroId: 0,
    nombre: '',
    categoriaId: 0
  },
  precioCompra: 0,
  utilidadMin: 0,
  stockActual: 0,
  precioVentaMin: 0,
  utilidadMax: 0,
  precioVentaMax: 0,
  categoria: {
    categoriaId: 0,
    nombre: '',
    izq: 0,
    der: 0
  },
  imagenes: [],
  atributos: []
};
