export const initialUsuario = {
    usuarioId: 0,
    ci: '',
    nombre: '',
    apellido: '',
    direccion: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    roles: []
};
export interface UsuarioEditar {
    usuarioId: number;
    ci: string;
    nombre: string;
    apellido: string;
    direccion: string;
    fechaNacimiento: string;
    email: string;
    telefono: string;
    roles: any[]; // You can replace 'any' with a more specific type if needed
}