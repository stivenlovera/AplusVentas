import React, { useState } from 'react'
import { IconButton, Paper } from '@mui/material';
import DeleteIcon from 'icons/DeleteIcon';
import Edit from 'icons/Edit';
import { DataTablaStandar } from 'components/data-table/data-table-standar';

export const Proceso = () => {
  const [rows, setRows] = useState([new TipoAsiento(1,"nombre asiento 1")])
  const [columns, setColumns] = useState([new ColumnaTabla("id","id")]);
  useEffect(()=>{
    setColumns([new ColumnaTabla("nombreTipoAsiento","nombre tipo asiento"),new ColumnaTabla("id","id")])
  });
  const inizialize = async () => {

  }
  const onRefresh = () => {
    inizialize()
  }
  const onClicks = [
    {
      nombre: 'Editar',
      icon: (
        <IconButton onClick={() => { console.log('Editar') }}>
          <Edit sx={{
            fontSize: 18,
            color: "text.disabled"
          }} />
        </IconButton>
      ),
    },
    {
      nombre: 'Eliminar',
      icon: (
        <IconButton onClick={() => { console.log('eliminar') }}>
          <DeleteIcon sx={{
            fontSize: 18,
            color: "text.disabled"
          }} />
        </IconButton>
      )
    }
  ]

  const [tableColumnExtensions] = useState([
    { columnName: 'id', width: 200, wordWrapEnabled: true, align: 'left' },
    { columnName: 'nombreTipoAsiento', wordWrapEnabled: true, align: 'left' },
  ]);
  var c = columns.map(x=> ({ columnName: x.name, width: 200, wordWrapEnabled: true, align: 'left' }))
  
  return (
    <DataTablaStandar
      columns={columns}
      rows={rows}
      tableColumnExtensions={tableColumnExtensions}
      onDelete={(row) => { console.log(row) }}
      onEdit={(row) => { console.log(row) }}
      onClicks={onClicks}
      AccionColumn={'id'}
    />

  )
}

export const Tabla = ({ rows, columns, tableColumnExtensions, onRefresh, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tipo, setTipo] = useState('');
 
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