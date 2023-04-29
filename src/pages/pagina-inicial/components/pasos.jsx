import General from "pages/configuracion-inicial/components/general/general";
import PlanCuentasList from "pages/configuracion-inicial/components/plan-cuentas/plan-cuentas-list";
import ProcesosList from "pages/configuracion-inicial/components/procesos-list/procesos-list";
import TipoProceso from "pages/configuracion-inicial/components/tipo-proceso/tipo-proceso";

export const Pasos = ({activeStep}) => {
    switch (activeStep) {
        case 0:
            return <General/>;
        case 1:
            return <PlanCuentasList/>;
        case 2:
            return <TipoProceso/>;
        case 3:
            return <ProcesosList/>;
        default:
            return null;
    }
};
