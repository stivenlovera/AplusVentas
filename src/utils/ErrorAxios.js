export function ErrorMesage(error) {
    if (error.response != undefined) {
        switch (error.status) {
            case 401:
                return "Session expirado"
            default:
                return "Ocurrio un error inesperado"
        }
    } else {
        return "Error servidor no encontrado"
    }
}