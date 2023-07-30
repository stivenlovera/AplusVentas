import { H2 } from 'components/Typography'
import CustomTable from 'page-sections/admin-ecommerce/CustomTable'
import React, { useEffect, useState } from 'react'
import { UseAlmacen } from '../hooks/useAlmacen'
import ListaProductosAlmacenColumns from './lista-productos-columns'

const ListaProductos = () => {
  const {GetProductosListaAlmacen} =  UseAlmacen();
  const [datos,setdatos] = useState([]);
  const onDatos = async ()=>{
   const {store} = await GetProductosListaAlmacen();
   console.log(store)
   setdatos(store);
  }
  useEffect(() => {
    onDatos()
    console.log("render")
    return () => {
      
    }
  }, [])
  
  return (
    <>
    
        <H2 marginBottom={2}>
            {"Productos"}
        </H2>
        <CustomTable columnShape={ListaProductosAlmacenColumns} data={datos} hidePagination/>

    </>
  )
}
export default ListaProductos;