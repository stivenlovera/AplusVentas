import { Box, Button, Card, Divider, Grid } from '@mui/material'
import SearchInput from 'components/input-fields/SearchInput'
import CustomTable from 'page-sections/admin-ecommerce/CustomTable'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useEffect, useState } from 'react'
import CreatePlanCuentaModal from './components/create-plan-cuenta-modal'
import PlanCuentaColumns from './components/plan-cuenta-columns'
import { useTranslation } from 'react-i18next'
import { H5, Tiny } from 'components/Typography'
import Add from 'icons/Add'
import { UseListPlanCuenta } from './hooks/useListarPlanCuenta'
import { Context } from 'contexts/ContextDataTable'
import { UseCreatePlanCuenta } from './hooks/useCreatePlanCuenta'
import { searchByNombre } from './utils/utilPlanCuenta'

const PlanCuentasList = () => {
  const {
    t
  } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [button, setButton] = useState(false);
  const { apiListar, lista } = UseListPlanCuenta();
  const { create, apiCreate } = UseCreatePlanCuenta();
  const [actualizarTable, setActualizarTableContext] = useState(true);

  const handlerOpenPadre = async () => {
    setButton(true);
    const open = await apiCreate();
    if (open) {
      setOpenModal(true);
    } else {
      setButton(false);
    }
  }
  const handlerCloseHijo = () => {
    setOpenModal(false);
    setButton(false);
  }

  const handlerBuscar = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if (actualizarTable) {
      apiListar();
    }
    setFilteredItem(filteredItem);
    setActualizarTableContext(false);
  }, [searchValue, actualizarTable]);

  return (
    <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
      <Card sx={{
        padding: 3
      }}>
        <H5 mb={3}>Plan Cuentas</H5>
        <Divider sx={{
          my: 2
        }} />
        <Box mt={2} mb={3}>
          <Tiny lineHeight={1.8} >
            Cree su estructura de planes de cuenta
          </Tiny>
          <br />
          <HeadingWrapper justifyContent="space-between" alignItems="center">
            <SearchInput bordered={'true'} placeholder="Buscar plan cuenta" onChange={handlerBuscar} />
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={handlerOpenPadre}
              disabled={button}
            >
              {t("Añadir Plan Cuenta")}
            </Button>
          </HeadingWrapper>
          <CustomTable columnShape={PlanCuentaColumns} data={lista} />
          <CreatePlanCuentaModal data={create} tipo={'nuevo'} open={openModal} onClose={handlerCloseHijo} />
        </Box>
      </Card>
    </Context.Provider>
  )
}

export default PlanCuentasList
