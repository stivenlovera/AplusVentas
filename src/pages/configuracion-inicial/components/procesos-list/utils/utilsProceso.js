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
export const initialAsiento = {
  asientoPlanCuenta: [
    {
      id: 0,
      vPlanCuenta: {
        id: 0,
        codigo: '',
        nombreCuenta: '',
        moneda: '',
        valor: 0,
        codigoIdentificador: '',
        nivel: 0,
        debe: 0,
        haber: 0,
        vPlanCuentaId: 0
      },
      asientoId: 0,
      rol: ''
    }
  ],
  tipoAsiento: {
    id: 0,
    nombreTipoAsiento: ''
  },
  asiento: {
    id: 0,
    nombreAsiento: '',
    tipoasientoId: 0
  }
}
export const initialListAsiento = [
  {
    asientoId: 1,
    nombreAsiento: 'con factura',
    nombreTipoAsiento : 'Compra',
    tipoAsientoId : 2
  }
]