import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import ShoppingBasket from "icons/ShoppingBasket";
import { H5 } from "components/Typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalAlmacen from "./components/modal-almacen/modal-almacen";

import Paper from '@mui/material/Paper';
import {
  RowDetailState, PagingState,
  IntegratedSorting,
  SortingState,
  IntegratedPaging
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel

} from '@devexpress/dx-react-grid-material-ui';
import { UseAlmacen } from "../hooks/useAlmacenes";

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

const RowDetail = ({ row }) => {
  return (
    <Box
      sx={{ margin: 2 }}
    >

    </Box >
  )
};

const AlmacenesList = () => {
  const {
    t
  } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [btnCreate, setBtnCreate] = useState(false);
  const { onList } = UseAlmacen();

  const [tableColumnExtensions] = useState([
    { columnName: 'codigo', width: 150, wordWrapEnabled: true },
    { columnName: 'fecha', width: 180, wordWrapEnabled: true },
    { columnName: 'descripcion', width: 180, wordWrapEnabled: true },
    { columnName: 'para', wordWrapEnabled: true },
    { columnName: 'total', width: 80, wordWrapEnabled: true },
    { columnName: 'metodoPago', width: 200, wordWrapEnabled: true },
    { columnName: 'realizado', wordWrapEnabled: true }
  ]);
  const [columns] = useState([
    { name: 'codigo', title: 'Codigo' },
    { name: 'fecha', title: 'Fecha' },
    { name: 'descripcion', title: 'Descripcion' },
    { name: 'para', title: 'Dirigido a' },
    { name: 'total', title: 'Total' },
    { name: 'metodoPago', title: 'Metodo de Pago' },
    { name: 'realizado', title: 'Usuario' }
  ]);
  const [rows, setRow] = useState([{
    codigo: "OC#0",
    fecha: "30/07/2023",
    descripcion: "Compra demo",
    cliente: "Rojer Martinez",
    total: "3600",
    metodoPago: "Con factura",
    usuario: "Stiven Lovera"
  }]);
  const [expandedRowIds, setExpandedRowIds] = useState([2, 5]);
  const inizializando = async () => {
    const { lista } = await onList();
    setRow(lista)
  }
  useEffect(() => {
    inizializando()
  }, [])

  return <Box pt={2} pb={4}>
    <HeadingWrapper justifyContent="space-between" alignItems="center">
      <FlexBox gap={0.5} alignItems="center">
        <IconWrapper>
          <ShoppingBasket sx={{
            color: "primary.main"
          }} />
        </IconWrapper>
        <H5>Almacen</H5>
      </FlexBox>
      <Button
        variant="contained"
        endIcon={<Add />}
        onClick={() => { }} disabled={btnCreate}
      >
        {t("Añadir Almacen")}
      </Button>
    </HeadingWrapper>
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table columnExtensions={tableColumnExtensions} />
        <RowDetailState
          defaultExpandedRowIds={[/* 2, 5 */]}
        />
        <TableRowDetail
          contentComponent={RowDetail}
        />
        {/* sort columns*/}
        <SortingState
          defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
        />
        <IntegratedSorting />
        <TableHeaderRow showSortingControls />
        {/* paggin */}
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <IntegratedPaging />
        <PagingPanel />
      </Grid>
    </Paper>
    <ModalAlmacen
      open={openModal}
      onClose={() => { }}
    />
  </Box>;
};

export default AlmacenesList;
