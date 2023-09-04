import { Add } from "@mui/icons-material";
import { Box, Button, IconButton, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import { H5 } from "components/Typography";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import Paper from '@mui/material/Paper';
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
import { UseAlmacen } from "../hooks/useAlmacenes";
import Edit from "icons/Edit";
import { Link } from "react-router-dom";
import { initialAlmacen } from "../utils/almacen";
import ModalAlmacen from "./components/modal-almacen/modal-almacen";

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

const AlmacenesList = () => {
  const {
    t
  } = useTranslation();
  const [openModalAlmacen, setOpenModalAlmacen] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [btnCreate, setBtnCreate] = useState(false);
  const [almacen, setAlmacen] = useState(initialAlmacen);
  const [editar, setEditar] = useState(false)
  const { onList, onStore, onCreate, onUpdate, onEditar, onDelete } = UseAlmacen();

  const [tableColumnExtensions] = useState([
    { columnName: 'nombreAlmacen', width: 200, wordWrapEnabled: true, align: 'left' },
    { columnName: 'codigoAlmacen', width: 180, wordWrapEnabled: true, align: 'left' },
    { columnName: 'dirrecion', wordWrapEnabled: true, align: 'left' },
    { columnName: 'id', width: 150, wordWrapEnabled: true, align: 'left' },
  ]);
  const [columns] = useState([
    { name: 'nombreAlmacen', title: 'Nombre' },
    { name: 'codigoAlmacen', title: 'Codigo' },
    { name: 'dirrecion', title: 'Dirrecion' },
    { name: 'id', title: 'Acciones' },
  ]);
  const [rows, setRow] = useState([]);

  const [currencyColumns] = useState(['id']);
  const CurrencyFormatter = ({ value, row }) => {
    return (
      <Fragment>
        <Link to={`/dashboard/almacen/${row.id}`}>
          <IconButton >
            <InventoryIcon sx={{
              fontSize: 18,
              color: "text.disabled"
            }} />
          </IconButton>
        </Link>
        <IconButton onClick={() => { handlerEditar(row) }}>
          <Edit sx={{
            fontSize: 18,
            color: "text.disabled"
          }} />
        </IconButton>
        <IconButton onClick={() => { handlerDelete(row) }}>
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

  /*EVENTO DE DE LISTA */
  const inizializando = async () => {
    const { lista } = await onList();
    setRow(lista)
  }
  const handlerCreate = async () => {
    const { create, status } = await onCreate();
    if (status) {
      setAlmacen(create)
      setOpenModalAlmacen(true)
    }
  }
  const handlerEditar = async (data) => {
    setEditar(true);
    setAlmacen(data);
    setOpenModalAlmacen(true)
  }
  const handlerSubmit = async (values) => {
    if (editar) {
      const { update, status } = await onUpdate(values);
      if (status) {
        setEditar(false);
        setOpenModalAlmacen(false);
        inizializando()
      }
    } else {
      const { store, status } = await onStore(values);
      if (status) {
        setOpenModalAlmacen(false);
        inizializando()
      }
    }
  }
  const handlerDelete = (row) => {
    setAlmacen(row)
    setOpenModalDelete(true)
  }
  const onDeleteAlmacen = async (data) => {
    const { status } = await onDelete(data.id)
    if (status) {
      setOpenModalDelete(false);
      inizializando()
    }
  }

  useEffect(() => {
    inizializando()
  }, [])

  return (
    <Box pt={2} pb={4}>
      <HeadingWrapper justifyContent="space-between" alignItems="center">
        <FlexBox gap={0.5} alignItems="center">
          <IconWrapper>
            <StoreMallDirectoryIcon sx={{
              color: "primary.main"
            }} />
          </IconWrapper>
          <H5>Almacenes</H5>
        </FlexBox>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={handlerCreate}
          disabled={btnCreate}
        >
          {t("Añadir Almacen")}
        </Button>
      </HeadingWrapper>
      <Paper>
        <Grid
          rows={rows}
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
      {/* <ModalAlmacen
        data={}
        editProduct={}
        onClose={}
        onSubmit={}
        open={}

      ></ModalAlmacen> */}
    </Box>
  );
};

export default AlmacenesList;
