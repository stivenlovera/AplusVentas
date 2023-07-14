import { Add } from "@mui/icons-material";
import { Box, Button, Grid, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import { H5 } from "components/Typography";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContextPermisos } from "./context/contextTablePermisos";
import { permisosFake, rolesFake, rolFake } from "./utils/rolesFake";
import ColumnsPermiso from "./components/columns-permisos/columns-permisos";
import ColumnsRoles from "./components/columns-rol/columns-roles";
import RolModal from "./components/modal-rol/modal-rol";
import { initialFormRoles } from "./utils/initialValuesRol";
import { Request } from "utils/http";
import { CreateRolService } from "Services/api-ventas-erp/rol";
import { searchByProceso } from "pages/configuracion-inicial/components/procesos-list/utils/utilsProceso";
import { searchByRolPermisos } from "./utils/search";

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

const PermisoList = () => {
    const {
        t
    } = useTranslation();
    const [listRoles, setListRoles] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [listPermisos, setListPermisos] = useState([]);

    const [btnCrear, setBtnCrear] = useState(false)
    const [create, setCreate] = useState(initialFormRoles)
    const [openModal, setOpenModal] = useState(false); // search input
    const [actualizarTable, setActualizarTableContext] = useState(true);

    const loadIndex = async () => {
        await onListaRoles();
        await onListPermisos();
    }
    useEffect(() => {
        if (actualizarTable) {
            loadIndex();
            setActualizarTableContext(false);
        } else {
            const result = searchByRolPermisos(listRoles, searchValue);
            setFilteredItem(result);
        }
    }, [searchValue,actualizarTable]);

    /*METODOS */
    const onCloseModalDelete = () => {
        setOpenModal(false);
        setBtnCrear(false);
    }
    const filter = () => {
        const result = searchByRolPermisos(filteredItem, searchValue);
        setFilteredItem(result);
    }

    /*API */
    const onCreate = async () => {
        setBtnCrear(true);
        const { data, message, status } = await Request({
            endPoint: CreateRolService(),
            initialValues: create,
            method: 'get',
            showError: true,
            showSuccess: false,
            values: create
        });
        setCreate({ ...create, permisos: data.permisos });
        if (!!status) {
            setOpenModal(true);
        } else {
            setBtnCrear(false);
        }
    }

    const onListPermisos = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Permiso`,
            initialValues: listPermisos,
            method: 'get',
            showError: true,
            showSuccess: false,
            values: listPermisos
        });
        if (!!status) {
            setListPermisos(data);
        }
    }

    const onListaRoles = async () => {
        const { data } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Rol`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        setListRoles(data);
        const result = searchByRolPermisos(data, searchValue);
        setFilteredItem(result);
    }

    return (
        <ContextPermisos.Provider value={[actualizarTable, setActualizarTableContext]}>
            <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                    <Box pt={2} pb={4}>
                        <HeadingWrapper justifyContent="space-between" alignItems="center">
                            <FlexBox gap={0.5} alignItems="center">
                                <IconWrapper>
                                    <ShoppingBasket sx={{
                                        color: "primary.main"
                                    }} />
                                </IconWrapper>
                                <H5>Roles</H5>
                            </FlexBox>
                            <SearchInput bordered={'true'} placeholder="Buscar rol" onChange={e => setSearchValue(e.target.value)} />
                            <Button variant="contained" endIcon={<Add />} onClick={onCreate} disabled={btnCrear}>
                                {t("Añadir Rol")}
                            </Button>
                        </HeadingWrapper>
                        <CustomTable columnShape={ColumnsRoles} data={filteredItem} />
                    </Box>
                </Grid>
                <RolModal form={create} onClose={onCloseModalDelete} open={openModal}></RolModal>
                <Grid item md={4} xs={12}>
                    <Box pt={2} pb={4}>
                        <HeadingWrapper justifyContent="space-between" alignItems="center">
                        </HeadingWrapper>
                        <CustomTable  columnShape={ColumnsPermiso} data={listPermisos} />
                    </Box>
                </Grid>
            </Grid>
        </ContextPermisos.Provider >
    );
};

export default PermisoList;