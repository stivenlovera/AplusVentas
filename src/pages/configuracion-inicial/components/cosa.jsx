import React, { useState } from 'react'
import { IconButton, Paper } from '@mui/material';
import DeleteIcon from 'icons/DeleteIcon';
import Edit from 'icons/Edit';
import { DataTablaStandar } from 'components/data-table/data-table-standar';

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

