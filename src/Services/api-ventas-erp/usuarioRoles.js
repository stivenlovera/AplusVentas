import axios from "axios";
import { AxiosRequest } from "utils/axios";
AxiosRequest()
export async function EditarUsuarioRolesService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/Usuario/${id}`);
}
export async function UpdateUsuarioRolesService(values) {
    return await axios.post(`${process.env.REACT_APP_API}api/Usuario`, values);
}