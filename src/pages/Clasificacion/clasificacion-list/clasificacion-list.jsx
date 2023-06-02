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
import CreateClasificacionModal from "./components/create-clasificacion";
import { Context } from "contexts/ContextDataTable";
import { initialClasificacionForm, searchByClasificacion} from "./utils/utils-clasificacion";
import { Request } from "utils/http";


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
    const [actualizarTable, setActualizarTableContext] = useState(true);
    const [listaClasificacion, setListaClasificacion] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [create, setCreate] = useState(initialClasificacionForm);
    const [btnCrear, setBtnCrear] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (actualizarTable) {
            console.log('actualizando table')
            onListCategoria();
            setActualizarTableContext(false);
        } else {
            const result = searchByClasificacion(listaClasificacion, searchValue);
            setFilteredItem(result);
        }
    }, [searchValue, actualizarTable,listaClasificacion]);

    /*METODOS */
    const handlerClose = () => {
        setOpenModal(false);
        setBtnCrear(false);
    }
    const mapearElementos = (listaCategoria) => { // solo 4 niveles
        let nuevoResultado = [];
        listaCategoria.map(((x, i) => {
            nuevoResultado.push({
                num: `${i + 1}`,
                categoriaId: x.categoriaId,
                nombre: x.nombre
            })
            if (x.hijos != undefined && x.hijos != null) {
                x.hijos.map((x, j) => {
                    nuevoResultado.push({
                        num: `${i + 1}.${j + 1}`,
                        categoriaId: x.categoriaId,
                        nombre: `${Array(10).fill('\xa0').join('')}${x.nombre}`
                    })
                    if (x.hijos != undefined && x.hijos != null) {
                        x.hijos.map((x, k) => {
                            nuevoResultado.push({
                                num: `${i + 1}.${j + 1}.${k + 1}`,
                                categoriaId: x.categoriaId,
                                nombre: `${Array(20).fill('\xa0').join('')}${x.nombre}`
                            })
                            if (x.hijos != undefined && x.hijos != null) {
                                x.hijos.map((x, m) => {
                                    nuevoResultado.push({
                                        num: `${i + 1}.${j + 1}.${k + 1}.${m + 1}`,
                                        categoriaId: x.categoriaId,
                                        nombre: `${Array(30).fill('\xa0').join('')}${x.nombre}`
                                    })
                                })
                            }
                        })
                    }
                })
            }
        }));
        return nuevoResultado;
    }
    /*API */
    const onListCategoria = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/categoria`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        if (!!status) {
            const listaCategoria = mapearElementos(data)
            //const result = searchByClasificacion(listaCategoria, searchValue);
            setListaClasificacion(listaCategoria);
            setFilteredItem(listaCategoria);
        }
    }
    const onCreate = async () => {
        setBtnCrear(true);
        setOpenModal(true);
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
                        <H5>Clasificacion</H5>
                    </FlexBox>
                    <SearchInput bordered={'true'} placeholder="Buscar clasificacion" onChange={e => setSearchValue(e.target.value)} />
                    <Button variant="contained" endIcon={<Add />} onClick={onCreate} disabled={btnCrear}>
                        {t("Añadir Clasificacion")}
                    </Button>
                </HeadingWrapper>
                <CustomTable columnShape={ProductosColumns} data={filteredItem} />
                <CreateClasificacionModal data={create} open={openModal} onClose={handlerClose}/>
            </Box>
        </Context.Provider>
    );
};

export default ClasificacionList;