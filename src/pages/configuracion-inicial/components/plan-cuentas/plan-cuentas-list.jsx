import { Add } from "@mui/icons-material";
import { Box, Button, Card, Divider, IconButton, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import { H3, H5, H6 } from "components/Typography";
import { Fragment, useEffect, useState } from "react";
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  RowDetailState, PagingState,
  IntegratedSorting,
  SortingState,
  IntegratedPaging,
  DataTypeProvider,
  SearchState,
  IntegratedFiltering
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
  Toolbar,
  SearchPanel
} from '@devexpress/dx-react-grid-material-ui';
import { HeadingWrapper } from "pages/admin-ecommerce/product-management";
import Edit from "icons/Edit";
import { initialCuenta } from "./utils/utilPlanCuenta";
import FlexBetween from "components/flexbox/FlexBetween";
import SearchInput from "components/input-fields/SearchInput";
import { UseCreatePlanCuenta } from "./hooks/useCreatePlanCuenta";
import CreatePlanCuentaModal from "./components/create-plan-cuenta-modal";
import { UseListPlanCuenta } from "./hooks/useListarPlanCuenta";
import ModalDelete from "components/modal-delete/modal-delete";
import { UseEditarPlanCuenta } from "./hooks/useEditarPlanCuenta";

const PlanCuentasList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [cuenta, setCuenta] = useState(cuenta)
  const [button, setButton] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { apiListar, lista } = UseListPlanCuenta();
  const { create, apiCreate } = UseCreatePlanCuenta();
  const { apiEditar, editar } = UseEditarPlanCuenta();
  const [tipo, setTipo] = useState('');
  const [asiento, setAsiento] = useState({
    id: "",
    codigo: '',
    nombreCuenta: "",
    moneda: '1',
    valor: '1',
    codigoIdentificador: '0',
    nivel: 0,
    debe: '0',
    haber: '0',
    vPlanCuentaId: 0,
  });

  const handlerOpenHijo = async () => {
    setTipo('hijo')
    setOpenModal(true)
  }
  const handlerOpenPadre = async () => {
    setButton(true);
    setTipo('nuevo')
    const open = await apiCreate();
    if (open) {
      setAsiento(create)
      setOpenModal(true);
    } else {
      setButton(false);
    }
  }

  const handlerOpenEditar = async () => {
    setButton(true);
    setTipo('editar')
    const open = await apiEditar();
    if (open) {
      setAsiento(editar)
      setOpenModal(true);
    } else {
      setButton(false);
    }
  }

  const handlerClose = async () => {
    console.log('on open')
    setOpenModal(false)
  }
  const handlerOpenEliminar = async () => {
    console.log('on open')
    setOpenModalDelete(true)
  }
  const handlerCloseEliminar = () => {
    setOpenModalDelete(false)
  }
  const handlerEnviar = (values) => {
    switch (tipo) {
      case 'nuevo':
        console.log('nuevo', values)
        break;
      case 'hijo':
        console.log('hijo', values)
        break;
      case 'editar':
        console.log('editar', values)
        break;
    }
  }

  const [tableColumnExtensions] = useState([
    { columnName: 'codigo', width: 200, wordWrapEnabled: true, align: 'left' },
    { columnName: 'nombreCuenta', width: 180, wordWrapEnabled: true, align: 'left' },
    { columnName: 'moneda', wordWrapEnabled: true, align: 'left' },
    { columnName: 'valor', wordWrapEnabled: true, align: 'left' },
    { columnName: 'nivel', wordWrapEnabled: true, align: 'left' },
    { columnName: 'debe', width: 150, wordWrapEnabled: true, align: 'left' },
    { columnName: 'haber', width: 150, wordWrapEnabled: true, align: 'left' },
    { columnName: 'id', width: 150, wordWrapEnabled: true, align: 'left' }

  ]);
  const [columns] = useState([
    { name: 'codigo', title: 'Codigo' },
    { name: 'nombreCuenta', title: 'Nombre cuenta' },
    { name: 'nivel', title: 'Nivel' },
    { name: 'moneda', title: 'Moneda' },
    { name: 'debe', title: 'Debe' },
    { name: 'haber', title: 'Haber' },
    { name: 'id', title: 'Acciones' },
  ]);


  const [currencyColumns] = useState(['id']);
  const CurrencyFormatter = ({ value, row }) => {
    return (
      <Fragment>
        <IconButton onClick={handlerOpenHijo}>
          <AddCircleIcon sx={{
            fontSize: 18,
            color: "text.disabled"
          }} />
        </IconButton>
        <IconButton onClick={handlerOpenEditar}>
          <Edit sx={{
            fontSize: 18,
            color: "text.disabled"
          }} />
        </IconButton>
        <IconButton onClick={handlerOpenEliminar}>
          <DeleteIcon sx={{
            fontSize: 18,
            color: "text.disabled"
          }} />
        </IconButton>
      </Fragment>
    )
  };

  const CurrencyTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      {...props}
    />
  );
  useEffect(() => {
    apiListar()
  }, [])

  return (
    <Box pt={0} pb={0}>
      <Card sx={{
        padding: 2
      }}>
        <FlexBetween>
          <H3>Cuentas</H3>
        </FlexBetween>
        <Divider sx={{
          my: 2
        }} />
        <HeadingWrapper justifyContent="space-between" sx={{ m: 0 }} alignItems="center">
          <div></div>
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={handlerOpenPadre}
            disabled={false}
          >
            Añadir cuenta
          </Button>
        </HeadingWrapper>
        <Paper>
          <Grid
            rows={lista}
            columns={columns}
          >

            {/* data format */}
            <CurrencyTypeProvider
              for={currencyColumns}
            />
            {/* sort columns*/}
            <SortingState
              defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
            />
            <IntegratedSorting />
            {/* paggin */}
            <PagingState
              defaultCurrentPage={0}
              pageSize={5}
            />
            <IntegratedPaging />
            <PagingPanel />
            {/* buscador */}
            <SearchState defaultValue="" />
            <IntegratedFiltering />
            <Toolbar />
            <SearchPanel />
            {/* table */}
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow showSortingControls />
          </Grid>
        </Paper>
      </Card>
      <CreatePlanCuentaModal data={asiento} tipo={tipo} open={openModal} onClose={handlerClose} onEnviar={handlerEnviar} />
      <ModalDelete onClose={handlerCloseEliminar} open={openModalDelete} />
    </Box>
  );

}

export default PlanCuentasList

/* const {
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
 */
/*  <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
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
    </Context.Provider> */