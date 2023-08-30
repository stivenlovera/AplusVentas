import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { H5, Tiny } from 'components/Typography'
import { Context } from 'contexts/ContextDataTable';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { UseListTipoAsiento } from './hooks/UseListTipoAsiento';
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management';
import SearchInput from 'components/input-fields/SearchInput';
import Add from 'icons/Add';
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import TipoAsientoColumns from './components/tipo-asiento-columns';
import CreateTipoAsientoModal from './components/create-tipo-asiento-modal';
import { UseCrearTipoAsiento } from './hooks/UseCrearTipoAsiento';

const TipoProceso = () => {
    const {
        t
    } = useTranslation();
    const [actualizarTable, setActualizarTableContext] = useState(false);
    const { filter, filteredItem, listar, searchValue, setSearchValue } = UseListTipoAsiento();
    const { create, optionPlanCuenta, optionRol, optionTipoAsiento, setCreate, openModal, handlerOpen, handlerClose } = UseCrearTipoAsiento();
    useEffect(() => {
        listar();
        setActualizarTableContext(false);
    }, [searchValue, actualizarTable]);
    return (
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
        <Card sx={{
            padding: 3
        }}>
            <H5 mb={3}>Clasificación de asientos</H5>
            <Divider sx={{
                my: 2
            }} />
            <Box mt={2} mb={3}>
                <Tiny lineHeight={1.8}>
                    Crea la forma en que se agruparán los asientos frecuentes Ej: ingresos, egresos, traspaso, etc.
                </Tiny>
                <br />
                <HeadingWrapper justifyContent="space-between" alignItems="center">
                    <Button
                        variant="contained"
                        endIcon={<Add />}
                        onClick={handlerOpen}
                    >
                        {t("Añadir clasificación")}
                    </Button>
                </HeadingWrapper>
                <CustomTable columnShape={TipoAsientoColumns} data={filteredItem} />
                <CreateTipoAsientoModal data={create} tipo={'nuevo'} open={openModal} onClose={handlerClose} />
            </Box>
        </Card>
    </Context.Provider>
    )
}

export default TipoProceso
