import { Add } from "@mui/icons-material";
import { Box, Button, Chip, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import { H5 } from "components/Typography";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateUsuarioModal from "./components/usuario-modal/create-usuario";
import UsuarioColumns from "./components/columns-usuario/usuario-columns";
import { usurioFake } from "./components/usuario-fake";
import { searchByNombre } from "./components/usuario-util";
import { UseListaUsuario } from "./hooks/use-list-usuario";
import { Context } from "contexts/ContextDataTable";
import { DataTablaCustomize } from "components/data-table/data-table-cuztomize";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

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
    const { ApiListaUsuario, filter, filteredItem, searchValue, setFilteredItem, setSearchValue } = UseListaUsuario();
    const [openModal, setOpenModal] = useState(false); // search input

    const [actualizarTable, setActualizarTableContext] = useState(false);

    const loadIndex = async () => {
        await ApiListaUsuario();
    }

    useEffect(() => {
        loadIndex();
        const result = searchByNombre(usurioFake, searchValue);
        setFilteredItem(result);
        setActualizarTableContext(false);

    }, [searchValue, actualizarTable]);

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
    const inizialize = async () => {

    }
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
                    <SearchInput bordered={'true'} placeholder="Buscar usuario" onChange={e => setSearchValue(e.target.value)} />
                    <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
                        {t("Añadir Usuario")}
                    </Button>
                </HeadingWrapper>
                <CustomTable columnShape={UsuarioColumns} data={filteredItem} />
                <CreateUsuarioModal open={openModal} onClose={() => setOpenModal(false)} />
            </Box>
            <DataTablaCustomize
                rows={rows}
                columns={columns}
                tableColumnExtensions={tableColumnExtensions}
            >
                <CurrencyTypeProvider
                    for={['roles']}
                    onClicks={({value, row, column}) => { console.log(value, row, column) }}
                />
            </DataTablaCustomize>
        </Context.Provider>
    );
};


export const CurrencyTypeProvider = props => {
    const { onClicks } = props;
    console.log('PROP CurrencyTypeProvider')
    return (
        <DataTypeProvider
            formatterComponent={({ value, row, column }) => CurrencyFormatter({ value, row, column, onClicks })}
            {...props}
        ></DataTypeProvider>
    )
};
export const CurrencyFormatter = ({ value, row, column, onClicks }) => {
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
                        onClick={() => onClicks({value, row, column})}
                    />)
                })
            }
        </Fragment>
    )
};
export default UsuarioList;