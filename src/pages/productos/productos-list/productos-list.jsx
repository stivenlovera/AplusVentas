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
import { searchByProductos } from "./utils/utils-productos";
import { Context } from "contexts/ContextDataTable";
import { Request } from "utils/http";
import { initialState } from "./utils/utils-productos";
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
    const [actualizarTable, setActualizarTableContext] = useState(true);
    const [listaProductos, setListaProductos] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [create, setCreate] = useState({
        codigo: '',
        proveedores: [],
        categorias: [],
        productosMaestros: []
    })

    useEffect(() => {
        if (actualizarTable) {
            onListProducto();
            setActualizarTableContext(false);
        } else {
            const result = searchByProductos(listaProductos, searchValue);
            setFilteredItem(result);

        }
    }, [searchValue, actualizarTable, listaProductos]);

    const onListProducto = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Producto`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        if (!!status) {
            setListaProductos(data);
            setFilteredItem(data);
        }
    }
    const onCreateProducto = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Producto/create`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        if (!!status) {
            console.log('respuesta de la api', data)
            setCreate(data);
            setOpenModal(true);
        }
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
                        <H5>Productos</H5>
                    </FlexBox>
                    <SearchInput bordered={'true'} placeholder="Buscar productos" onChange={e => setSearchValue(e.target.value)} />
                    <Button variant="contained" endIcon={<Add />} onClick={onCreateProducto}>
                        {t("Añadir Producto")}
                    </Button>
                </HeadingWrapper>
                <CustomTable columnShape={ProductosColumns} data={filteredItem} />
                <CreateProductoModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    data={{
                        codigo: create.codigo,
                        proveedores: create.proveedores,
                        categorias: create.categorias,
                        productosMaestros: create.productosMaestros,
                        initialState: initialState
                    }} />
            </Box>
        </Context.Provider>
    );
};

export default ProductosList;