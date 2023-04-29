import { Box, Button, Card, Divider } from '@mui/material'
import SearchInput from 'components/input-fields/SearchInput'
import CustomTable from 'page-sections/admin-ecommerce/CustomTable'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { H5, Tiny } from 'components/Typography'
import Add from 'icons/Add'
import CreateProcesoModal from './components/create-proceso-modal'
import ProcesoColumns from './components/proceso-columns'
import { Context } from 'contexts/ContextDataTable'
import { UseListProceso } from './hooks/UseListaProceso'
import { UseCrearProceso } from './hooks/UseCrearProceso'

const ProcesosList = () => {
    const {
        t
    } = useTranslation();
    const [actualizarTable, setActualizarTableContext] = useState(false);
    const { filter, filteredItem, listar, searchValue, setSearchValue } = UseListProceso();
    const { create, optionPlanCuenta, optionRol, optionTipoAsiento, setCreate, openModal, handlerOpen, handlerClose } = UseCrearProceso();
    useEffect(() => {
        listar();
        setActualizarTableContext(false);
    }, [searchValue, actualizarTable]);
    
    return (
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
            <Card sx={{
                padding: 3
            }}>
                <H5 mb={3}>Asientos contables</H5>
                <Divider sx={{
                    my: 2
                }} />
                <Box mt={2} mb={3}>
                    <Tiny lineHeight={1.8} >
                        Cree un tipo de proceso para registrar un proceso Ej: venta, compra, prestamos, credito, etc.
                    </Tiny>
                    <br />
                    <HeadingWrapper justifyContent="space-between" alignItems="center">
                        <SearchInput bordered={'true'} placeholder="Buscar plan cuenta" onChange={e => setSearchValue(e.target.value)} />
                        <Button
                            variant="contained"
                            endIcon={<Add />}
                            onClick={handlerOpen}
                        >
                            {t("Añadir asiento")}
                        </Button>
                    </HeadingWrapper>
                    <CustomTable columnShape={ProcesoColumns} data={filteredItem} />
                    <CreateProcesoModal data={create} optionTipoAsiento={optionTipoAsiento} optionPlanCuenta={optionPlanCuenta} optionRol={optionRol} tipo={'nuevo'} open={openModal} onClose={handlerClose} />
                </Box>
            </Card>
        </Context.Provider>
    )
}

export default ProcesosList
