export const searchByName = (listData, searchValue) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter(item => item.name.toLocaleLowerCase().match(searchValue.toLowerCase()));
    return searchResult;
  } else {
    return listData;
  }
};
export const getRoute = pathname => {
  const str = pathname.split("/");
  return `/${str[1]}`;
};

/**
 * 
 * @param {UsuarioActual} user 
 * @returns 
 */
export const getAllRutas = (user) => {
  const rutas = [];
  user.roles.forEach((role) => {
    role.permisos.forEach((permiso) => {
      rutas.push(permiso.ruta);
    });
  });
  return rutas;
};