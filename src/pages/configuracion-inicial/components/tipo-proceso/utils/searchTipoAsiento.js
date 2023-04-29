export const searchByNombreTipoAsiento = (listData, searchValue) => {
    if (searchValue.length > 0) {
      const searchResult = listData.filter(item => item.nombreTipoAsiento.toLocaleLowerCase().match(searchValue.toLowerCase()));
      return searchResult;
    } else {
      return listData;
    }
  };
  export const getRoute = pathname => {
    const str = pathname.split("/");
    return `/${str[1]}`;
  };