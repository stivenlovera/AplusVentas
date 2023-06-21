export const almacenFake = [{
  id: 1,
  codigoAlmacen: "alm-01",
  dirrecion: "av mutualista",
  nombreAlmacen: "Mutualista"
}, {
  id: 2,
  codigoAlmacen: "alm-02",
  dirrecion: "calle españa",
  nombreAlmacen: "Central"
}];

export const searchByAlmacen = (listData, searchValue) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter(item =>
      item.nombreAlmacen.toLocaleLowerCase().match(searchValue.toLowerCase())
      || item.dirrecion.toLocaleLowerCase().match(searchValue.toLowerCase())
      || item.codigoAlmacen.toLocaleLowerCase().match(searchValue.toLowerCase())
    );
    return searchResult;
  } else {
    return listData;
  }
};

export const initialFormAlmacen = {
  id: 0,
  codigoAlmacen: "",
  dirrecion: "",
  nombreAlmacen: ""
};

