export const searchByRolPermisos = (listData, searchValue) => {
    if (searchValue.length > 0) {
      const searchResult = listData.filter(item => item.nombre.toLocaleLowerCase().match(searchValue.toLowerCase()));
      return searchResult;
    } else {
      return listData;
    }
  };