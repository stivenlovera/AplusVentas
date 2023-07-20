import moment from 'moment';
export const searchByOrdenCompra = (listData, searchValue) => {
    if (searchValue.length > 0) {
        const searchResult = listData.filter(item =>
            item.codigoCompra.toLocaleLowerCase().match(searchValue.toLowerCase())
            || item.fechaCreacion.toLocaleLowerCase().match(searchValue.toLowerCase())
            || item.nombreEstado.toLocaleLowerCase().match(searchValue.toLowerCase())
            || item.usuario.toLocaleLowerCase().match(searchValue.toLowerCase())
            || item.proveedor.toLocaleLowerCase().match(searchValue.toLowerCase())
            || item.total.toString().toLocaleLowerCase().match(searchValue.toLowerCase())
        );
        return searchResult;
    } else {
        return listData;
    }
};
export const preProcesarOrdenCompra = (data) => {
    data.map((value) => {
        value.fechaCreacion = moment(value.fechaCreacion).format('DD/MM/yyyy')
    })
    return data;
}
