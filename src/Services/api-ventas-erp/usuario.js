import axios from "axios";
import { AxiosRequest } from "utils/axios";
AxiosRequest()
export async function ListaUsuarioService() {
    return await axios.get(`${process.env.REACT_APP_API}api/Usuario`);
}
export async function StoreUsuarioService(values) {
    return await axios.post(`${process.env.REACT_APP_API}api/Persona`, values);
}