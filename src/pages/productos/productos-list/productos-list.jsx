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
import CreateProductoModal from "./components/create-producto";
import ProductosColumns from "./components/productos-columns";
import { productosFake } from "./components/productosFake";
import { searchByNombre } from "./components/utils-productos";
import { ObtenerProductoService } from "Services/api-ventas-erp/proveedorService";
import { Context } from "contexts/ContextDataTable";
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

const ProductosList = () => {
    const {
        t
    } = useTranslation();
    const [openModal, setOpenModal] = useState(false); // search input
    const [actualizarTable, setActualizarTableContext] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [filteredItem, setFilteredItem] = useState(productosFake);

    const ApiObtenerTodo = async () => {
        const { data } = await ObtenerProductoService();
        setFilteredItem(data.data);
    }
    useEffect(() => {
        ApiObtenerTodo()
        const result = searchByNombre(productosFake, searchValue);
        setFilteredItem(result);
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
                        <H5>Productos</H5>
                    </FlexBox>
                    <SearchInput bordered={'true'} placeholder="Buscar productos" onChange={e => setSearchValue(e.target.value)} />
                    <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
                        {t("Añadir Producto")}
                    </Button>
                </HeadingWrapper>
                <CustomTable columnShape={ProductosColumns} data={filteredItem} />
                <CreateProductoModal open={openModal} onClose={() => setOpenModal(false)} tipo={'nuevo'} />
            </Box>
        </Context.Provider>
    );
};

export default ProductosList;