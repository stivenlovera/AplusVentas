import { Collapse } from "@mui/material";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
const columns = [
    {
        Header: "Almacen",
        accessor: "nombreAlmacen"
    },
    {
        Header: "Cantidad",
        accessor: "cantidad"
    },
]
const ListaProductosAlmacenColumns = 

    [
        {
                Header: "nombre",
                accessor: "nombreProducto"
        },
        {
                Header: "cantidad",
                accessor: "cantidadTotal",
                Cell:({row})=>{
console.log(row)
                    return (<>
                    <CustomTable columnShape={columns} data={row.original.mostrarAlmacenes} hidePagination> 

                    </CustomTable>
               
                </>);
                }
        },
    ]
export default ListaProductosAlmacenColumns;