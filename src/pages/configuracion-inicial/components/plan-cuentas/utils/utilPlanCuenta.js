export const searchByNombre = (listData, searchValue) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter(item => item.nombreCuenta.toLocaleLowerCase().match(searchValue.toLowerCase()));
    return searchResult;
  } else {
    return listData;
  }
};
export const getRoute = pathname => {
  const str = pathname.split("/");
  return `/${str[1]}`;
};

export const initialCuenta = [{
  codigo: '1000000',
  nombreCuenta: 'nombre cuenta',
  moneda: 0,
  valor: 0,
  nivel: 0,
  debe: 0,
  haber: 0,
  id: 0
}]