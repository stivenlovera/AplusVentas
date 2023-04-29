import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import { H5 } from "components/Typography";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductosColumns from "./components/clasificacion-columns";
import { clasificacionFake, productosFake } from "./components/clasificacionFake";
import { searchByNombre } from "./components/utils-clasificacion";
import CreateClasificacionModal from "./components/create-clasificacion";
import { ObtenerClasificacionService } from "Services/api-ventas-erp/clasificacionService";
import { Context } from "contexts/ContextDataTable";
import { UseClasificacion, UseCreateClasificacion } from "./hooks/UseCreateClasificacion";
import UseListClasificacion from "./hooks/UseListClasificacion";

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

const ClasificacionList = () => {
    const {
        t
    } = useTranslation();

    const [actualizarTable, setActualizarTableContext] = useState(false);

    const { listar, filteredItem, filter, setSearchValue, searchValue } = UseListClasificacion();
    const { crear, create, options, setCreate, openModal, handlerOpen, handlerClose } = UseCreateClasificacion();

    useEffect(() => {
        listar();
        setActualizarTableContext(false);
    }, [searchValue, actualizarTable]);
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
                        <H5>Clasificacion</H5>
                    </FlexBox>
                    <SearchInput bordered={'true'} placeholder="Buscar clasificacion" onChange={e => setSearchValue(e.target.value)} />
                    <Button variant="contained" endIcon={<Add />} onClick={handlerOpen}>
                        {t("Añadir Clasificacion")}
                    </Button>
                </HeadingWrapper>
                <CustomTable columnShape={ProductosColumns} data={filteredItem} />
                <CreateClasificacionModal data={create} options={options} open={openModal} onClose={handlerClose} tipo={'nuevo'} />
            </Box>
        </Context.Provider>
    );
};

export default ClasificacionList;