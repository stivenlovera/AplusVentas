export const searchByProceso = (listData, searchValue) => {
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