import React, { useState } from 'react'
import { IconButton, Paper } from '@mui/material';
import DeleteIcon from 'icons/DeleteIcon';
import Edit from 'icons/Edit';
import { DataTablaStandar } from 'components/data-table/data-table-standar';

export const Proceso = () => {
  const [rows, setRows] = useState([
    { id: 1, nombreTipoAsiento: 'demo' },
    { id: 1, nombreTipoAsiento: 'demo' },
  ])
  const [columns, setColumns] = useState([
    { name: 'id', title: 'Id' },
    { name: 'nombreTipoAsiento', title: 'Nombre' }
  ]);

  const inizialize = async () => {

    setRows(
      [
        { id: 1, nombreTipoAsiento: 'aaa' },
        { id: 1, nombreTipoAsiento: 'aa' },
      ]
    )
  }
  const onRefresh = () => {
    inizialize()
  }
  const onEditar = () => {
    inizialize()
  }
  const onClicks = [
    {
      nombre: 'Editar',
      onClick: (row) => { console.log(row); onEditar() },
      icon: (
        <Edit sx={{
          fontSize: 18,
          color: "text.disabled"
        }} />
      ),
    },
    {
      nombre: 'Eliminar',
      onclick: (row) => { console.log(row) },
      icon: (
        <DeleteIcon sx={{
          fontSize: 18,
          color: "text.disabled"
        }} />
      )
    }
  ]

  const [tableColumnExtensions] = useState([
    { columnName: 'id', width: 500, wordWrapEnabled: true, align: 'left' },
    { columnName: 'nombreTipoAsiento', wordWrapEnabled: true, align: 'left' },
  ]);

  return (
    <DataTablaStandar
      columns={columns}
      rows={rows}
    />
  )
}