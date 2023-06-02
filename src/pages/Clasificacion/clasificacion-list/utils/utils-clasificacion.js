export const searchByClasificacion = (listData, searchValue) => {
  if (searchValue.length > 0) {
      const searchResult = listData.filter(item =>
          item.nombre.toLocaleLowerCase().match(searchValue.toLowerCase())
          || item.num.toLocaleLowerCase().match(searchValue.toLowerCase())
      );
      return searchResult;
  } else {
      return listData;
  }
};
export const getRoute = pathname => {
  const str = pathname.split("/");
  return `/${str[1]}`;
};

export const initialClasificacion = {
  clasificacion: {
    id: 0,
    nombreClasificacion: '',
    clasificacionId: 0,
    nombreClasificacionPadre: ''
  },
  clasificaciones: []
}
export const initialClasificacionForm = {
    categoriaId: 0,
    nombre: ''
}

export const initialEtiquetaForm=[
  {
    categoriaId: 0,
    atributoId: 0,
    etiqueta: 'string',
    tipo: 'string'
  }
]
