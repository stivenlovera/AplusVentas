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

export const initialState = {
  productoId: 0,
  codigoProducto: '',
  codigoBarra: '',
  nombreProducto: '',
  productoMaestroNombre: '',
  productoMaestroId: 0,
  unidadMedida: '',
  precioCompra: 0,
  utilidadMin: 0,
  stockMinimo: 0,
  precioVentaMin: 0,
  utilidadMax: 0,
  precioVentaMax: 0,
  proveedorId: '',
  categoriaId: '',
  imagenes: [],
  atributos: []
};
