import { Add } from "@mui/icons-material";
import { Button, Grid, IconButton, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import DeleteIcon from "icons/DeleteIcon";
import * as Yup from "yup"; // component props interface
import { initialUsuario, UsuarioEditar } from "../utils/initialUsuario";
import { DatePicker } from "@mui/x-date-pickers";
import { UseStoreUsuario } from "./hook/use-store-usuario";
import { UseUsuario } from "../../hooks/useUsuario";
// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));
const ImageDeleteWrapper = styled(FlexRowAlign)(({
    theme
}) => ({
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: "50%",
    position: "absolute",
    backgroundColor: theme.palette.error.main
}));
const ImageUploadWrapper = styled(FlexRowAlign)(({
    theme
}) => ({
    minHeight: 140,
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: theme.palette.grey[200]
}));
/**
 * 
 * @param {Object} props 
 * @param {boolean} props.open
 * @param {UsuarioEditar} props.data 
 * @returns 
 */
const CreateUsuarioModal = ({
    open,
    data,
    onClose,
    editUsuario
}) => {

    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));

    const validationSchema = Yup.object().shape({
        id: Yup.number().nullable(),
        ci: Yup.string().min(3, "Deben ser mayor 3 a caracteres").required("ci es requerido!"),
        nombre: Yup.string().required("Nombre es requerido!"),
        apellido: Yup.string().required("Apellido es requerido!"),
        direccion: Yup.string().required("Direccion es requerido!"),
        fechaNacimiento: Yup.string().required("Fecha Nacimiento es requerido!"),
        email: Yup.string().email().required("Email es requerido!"),
        telefono: Yup.string().required("Telefono es requerido!")
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        touched
    } = useFormik({
        initialValues: data ?? initialUsuario,
        validationSchema,
        onSubmit: async (values) => {
            if (editUsuario) {
                //editar
            } else {
                var response = await ApiStoreUsuario();
                if (response) {
                    resetForm();
                    onClose();
                }

            }
        }
    });
    const { ApiStoreUsuario } = UseStoreUsuario(values);

    /* Metodos */
    const handleChangeFecha = (date) => {
        setFieldValue('fechaNacimiento', date)
    }

    /* Metodos api*/
    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editUsuario && data ? "Editar usuario" : "Añadir usuario"}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>CI</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="ci"
                            placeholder="CI"
                            value={values.ci}
                            onChange={handleChange}
                            error={Boolean(touched.ci && errors.ci)}
                            helperText={touched.ci && errors.ci}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Fecha nacimiento</H6>
                        <DatePicker
                            fullWidth
                            inputFormat="yyyy-MM-dd"
                            value={values.fechaNacimiento}
                            onChange={handleChangeFecha}
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    error: Boolean(touched.fechaNacimiento && errors.fechaNacimiento)
                                }
                            }}
                            renderInput={params =>
                                <AppTextField {...params}
                                    fullWidth
                                    name="Fecha vencimiento"
                                    size="small"
                                    helperText={touched.fechaNacimiento && errors.fechaNacimiento}
                                />} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Nombres</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombre"
                            placeholder="Nombres"
                            value={values.nombre}
                            onChange={handleChange}
                            error={Boolean(touched.nombre && errors.nombre)}
                            helperText={touched.nombre && errors.nombre}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Apellidos</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="apellido"
                            placeholder="Apellidos"
                            value={values.apellido}
                            onChange={handleChange}
                            error={Boolean(touched.apellido && errors.apellido)}
                            helperText={touched.apellido && errors.apellido}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Dirrecion</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="direccion"
                            placeholder="Dirrecion"
                            value={values.direccion}
                            onChange={handleChange}
                            error={Boolean(touched.direccion && errors.direccion)}
                            helperText={touched.direccion && errors.direccion}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Email</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Telefono</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="telefono"
                            placeholder="Telefono"
                            value={values.telefono}
                            onChange={handleChange}
                            error={Boolean(touched.telefono && errors.telefono)}
                            helperText={touched.telefono && errors.telefono}
                        />
                    </Grid>
                </Grid>
            </Scrollbar>

            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button fullWidth type="submit" variant="contained">
                            Registrar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};

export default CreateUsuarioModal;