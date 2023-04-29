import { Box, Grid } from "@mui/material";
import Shopping from "icons/Shopping";
import Heading from "page-sections/ecommerce/Heading";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import General from "../components/general/general";
import PlanCuentasList from "../components/plan-cuentas/plan-cuentas-list";
import ConfigurePlanes from "../components/configure-planes/ConfigurePlanes";
import Clasificacion from "../components/clasificacion/clasificacion";
import ProcesosList from "../components/procesos-list/procesos-list";
import TipoProceso from "../components/tipo-proceso/tipo-proceso";

const Configuracion = () => {
  const navigate = useNavigate();
  const [selectPaymentMethod, setSelectPaymentMethod] = useState("paypal");
  
  const handleChangePaymentMethod = event => {
    setSelectPaymentMethod(event.target.value);
  };
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Heading title="Configuracion" Icon={Shopping} />
        </Grid>
        <Grid item md={8} xs={12}>
          <General />
        </Grid>
        <Grid item md={4} xs={12}>
          <Clasificacion />
        </Grid>
        <Grid item md={12} xs={12}>
          <PlanCuentasList />
        </Grid>
        <Grid item md={12} xs={12}>
          <ConfigurePlanes />
        </Grid>
        <Grid item md={8} xs={12}>
          <ProcesosList />
        </Grid>
        <Grid item md={4} xs={12}>
          <TipoProceso />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Configuracion
