
export const clienteListFake = [{
    id: "0",
    codigoCliente: "",
    nombreCompletoCliente: "",
    numeroDocumento: "",
    dirrecion: "",
    telefono: '',
    correoElectronico: "",
    codigoTipoDocumentoIdentidad: 0,
    complemento: '',
    tipoDocumentoIdentidad: {
        id: 0,
        codigoClasificador: '',
        codigoTipoParametro: '',
        descripcion: ''
    }
}];

export const initialStateCliente = {
    id: "0",
    codigoCliente: "",
    nombreCompletoCliente: "",
    numeroDocumento: "",
    dirrecion: "",
    telefono: '',
    correoElectronico: "",
    codigoTipoDocumentoIdentidad: '',
    complemento: ' ',
    tipoDocumentoIdentidad: {
        id: 1,
        codigoClasificador: '1',
        codigoTipoParametro: '1',
        descripcion: 'Carnet identidad',
    }
};