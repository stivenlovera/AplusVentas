import { Add } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Tooltip, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import { H1, H5 } from "components/Typography";
import ShoppingBasket from "icons/ShoppingBasket";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateUsuarioModal from "./components/usuario-modal/create-usuario";
import { Context } from "contexts/ContextDataTable";
import { DataTablaCustomize } from "components/data-table/data-table-cuztomize";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { UseUsuario } from "./hooks/useUsuario";
import Edit from "icons/Edit";
import Delete from "icons/Delete";
import ModalCrud from "components/modal-crud/modal-crud";
import { CrearEditarUsuario } from "./components/usuario-modal/crear-editar-usuario";
import { UsuarioDto } from "interfaces/Interfaces";
import { initialUsuario } from "./components/utils/initialUsuario";
import { UsuarioActions } from "./components/actions/usuario-actions";
export const HeadingWrapper = styled(FlexBox)(({
    theme
}) => ({
    marginBottom: 20,
    flexWrap: "wrap",
    [theme.breakpoints.down(530)]: {
        "& .MuiButton-root": {
            width: "100%"
        },
        "& .MuiInputBase-root": {
            maxWidth: "100%",
            marginBottom: 15
        }
    }
}));

const UsuarioList = () => {
    const {
        t
    } = useTranslation();
    const { onList, onCreate } = UseUsuario();
    const [openModal, setOpenModal] = useState(false); // search input
    const [actualEditar, setActual] = useState(initialUsuario); // search input

    const [actualizarTable, setActualizarTableContext] = useState(false);

    const load = async () => {
        const lista = await onList();
        if (lista.status) {
            setRows(lista.data);
        }
    }
    /**
     * 
     * @param {UsuarioDto} actual 
     */
    const getActual = (data) => {
        onCreate(data.usuarioId).then((result) => {
            if (result.status) {
                setActual(result.data);
            }
        });
    }
    const [rows, setRows] = useState([
        {
            nombre: 'demo',
            ci: 'demo',
            apellido: 'demo',
            nombreAsiento: 'demo',
            asientoId: 'demo',
            roles: 'demo',
            usuarioId: 1
        }
    ])

    const [tableColumnExtensions] = useState([
        { columnName: 'nombre', wordWrapEnabled: true, align: 'left' },
        { columnName: 'ci', wordWrapEnabled: true, align: 'left' },
        { columnName: 'apellido', wordWrapEnabled: true, align: 'left' },
        { columnName: 'fechaNacimiento', wordWrapEnabled: true, align: 'left' },
        { columnName: 'roles', wordWrapEnabled: true, align: 'left' },
        { columnName: 'usuarioId', width: 120, wordWrapEnabled: true, align: 'left' }
    ]);
    const [columns] = useState([
        { name: 'nombre', title: 'Clasificacion' },
        { name: 'ci', title: 'Nombre asiento' },
        { name: 'apellido', title: 'Apellido' },
        { name: 'fechaNacimiento', title: 'Nombre asiento' },
        { name: 'roles', title: 'Rol' },
        { name: 'usuarioId', title: 'Acciones' }
    ]);
    useEffect(() => {
        load()
    }, [])

    return (
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
            <Box pt={2} pb={4}>
                <HeadingWrapper justifyContent="space-between" alignItems="center">
                    <FlexBox gap={0.5} alignItems="center">
                        <IconWrapper>
                            <ShoppingBasket sx={{
                                color: "primary.main"
                            }} />
                        </IconWrapper>
                        <H5>Usuario</H5>
                    </FlexBox>

                    <Button variant="contained" endIcon={<Add />} onClick={() => { setOpenModal(true) }}>
                        {t("Añadir Usuario")}
                    </Button>
                </HeadingWrapper>
                <DataTablaCustomize
                    rows={rows}
                    columns={columns}
                    tableColumnExtensions={tableColumnExtensions}
                >

                    <DataTypeProvider
                        for={['roles']}
                        formatterComponent={({ value, row, column }) => MostrarRoles({ value, row, column })}
                    />
                    <DataTypeProvider
                        for={['usuarioId']}
                        formatterComponent={({ value, row, column }) => UsuarioActions({ row })}
                    />

                </DataTablaCustomize>
                <CreateUsuarioModal open={openModal} onClose={() => setOpenModal(false)} />
            </Box>

        </Context.Provider >
    );
};


export const CurrencyTypeProvider = props => {
    const { onClicks } = props;
    console.log('PROP CurrencyTypeProvider')
    return (
        <DataTypeProvider
            formatterComponent={({ value, row, column }) => MostrarRoles({ value, row, column, onClicks })}
            {...props}
        ></DataTypeProvider>
    )
};



export const MostrarRoles = ({ value, row, column, onClicks }) => {
    console.log('VALORES DE LA FILA', row)
    var roles = [];
    if (row.roles != "") {
        roles = row.roles.split(",");
    }
    return (
        <Fragment>
            {
                roles.map((rol, i) => {
                    return (<Chip
                        key={i}
                        size="small"
                        label={rol}
                        sx={{ m: 0.5 }}
                        onClick={onClicks ? () => onClicks({ value, row, column }) : () => { }}
                    />)
                })
            }
        </Fragment>
    )
};
export default UsuarioList;