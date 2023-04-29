import { Box, Button, Card, Divider, Grid } from '@mui/material'
import IconWrapper from 'components/IconWrapper'
import FlexBox from 'components/flexbox/FlexBox'
import SearchInput from 'components/input-fields/SearchInput'
import ShoppingBasket from 'icons/ShoppingBasket'
import CustomTable from 'page-sections/admin-ecommerce/CustomTable'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useEffect, useState } from 'react'
import CreatePlanCuentaModal from './components/create-plan-cuenta-modal'
import PlanCuentaColumns from './components/plan-cuenta-columns'
import { useTranslation } from 'react-i18next'
import { H5, Tiny } from 'components/Typography'
import Add from 'icons/Add'
import {UseListPlanCuenta} from './hooks/useListarPlanCuenta'
import { Context } from 'contexts/ContextDataTable'
import { UseCreatePlanCuenta } from './hooks/useCreatePlanCuenta'

const PlanCuentasList = () => {
  const {
    t
  } = useTranslation();
  const { filter, filteredItem, listar, searchValue, setSearchValue } = UseListPlanCuenta();
  const { create, options, setCreate, openModal, handlerOpen, handlerClose } = UseCreatePlanCuenta();
  const [actualizarTable, setActualizarTableContext] = useState(false);
  useEffect(() => {
    listar();
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
            <SearchInput bordered={'true'} placeholder="Buscar plan cuenta" onChange={e => setSearchValue(e.target.value)} />
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={handlerOpen}
            >
              {t("Añadir Plan Cuenta")}
            </Button>
          </HeadingWrapper>
          <CustomTable columnShape={PlanCuentaColumns} data={filteredItem} />
          <CreatePlanCuentaModal data={create} tipo={'nuevo'} open={openModal} onClose={handlerClose} />
        </Box>
      </Card>
    </Context.Provider>
  )
}

export default PlanCuentasList
