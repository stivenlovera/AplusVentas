import React, { useState } from 'react'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
  Toolbar,
  SearchPanel
} from '@devexpress/dx-react-grid-material-ui';
import {
  RowDetailState, PagingState,
  IntegratedSorting,
  SortingState,
  IntegratedPaging,
  DataTypeProvider,
  SearchState,
  IntegratedFiltering
} from '@devexpress/dx-react-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IconButton, Paper } from '@mui/material';
import DeleteIcon from 'icons/DeleteIcon';
import Edit from 'icons/Edit';
export const CurrencyFormatter = ({ value, row, column,onEdit, onDelete}) => {
  return (
    <>
      <IconButton onClick={() => { onEdit(row)}}>
        <Edit sx={{
          fontSize: 18,
          color: "text.disabled"
        }} />
      </IconButton>
      <IconButton onClick={() => {onDelete(row)  }}>
        <DeleteIcon sx={{
          fontSize: 18,
          color: "text.disabled"
        }} />
      </IconButton>
    </>
  )
};
export const Proceso = () => {
  const [rows, setRows] = useState([{ id: 23, nombreTipoAsiento: "nombre" }])
  const [columns, setColumns] = useState([
    { name: 'nombreTipoAsiento', title: 'nombre TipoAsiento' },
    { name: 'id', title: 'id' }
  ])
  const inizialize = async () => {

  }
  const onRefresh = () => {
    inizialize()
  }

  const [tableColumnExtensions] = useState([
    { columnName: 'id', width: 200, wordWrapEnabled: true, align: 'left' },
    { columnName: 'nombreTipoAsiento', wordWrapEnabled: true, align: 'left' },
  ]);
  return (
    <Tabla
      columns={columns}
      rows={rows}
      onRefresh={onRefresh}
      tableColumnExtensions={tableColumnExtensions}
      onDelete={(row) => {console.log(row) }}
      onEdit={(row) => {console.log(row) }}
    />

  )
}

export const Tabla = ({ rows, columns, tableColumnExtensions, onRefresh, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tipo, setTipo] = useState('');
  const [asiento, setAsiento] = useState({
    "id": 0,
    "nombreTipoAsiento": ""
  });
 

  const CurrencyTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={({ value, row, column }) =>CurrencyFormatter({value, row, column,onDelete,onEdit})}
      {...props}
    />
  );

  const handlerOpenEditar = async (id) => {

  }

  const handlerClose = async () => {
    setOpenModal(false)
  }
  const handlerOpenEliminar = async (asiento) => {
    setAsiento(asiento)
    setOpenModalDelete(true);
  }

  const hadlerEliminar = async (asiento) => {

  }
  const handlerCloseEliminar = () => {
    setOpenModalDelete(false)

  }
  const handlerEnviar = async (values) => {


  }
  const inizialize = async () => {

  }
  const [currencyColumns] = useState(['id']);
  return (
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
  )
}
