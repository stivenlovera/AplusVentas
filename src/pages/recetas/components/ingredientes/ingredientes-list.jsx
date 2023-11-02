import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { Add, Delete, Rowing } from "@mui/icons-material";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import AutocompleteAsync from "components/AutocompleteAsync";
import { DataTablaCustomize } from "components/data-table/data-table-cuztomize"
import { useEffect, useRef, useState } from "react";
import React from 'react';
import { UseProducto } from "pages/recetas/hooks/useProducto";

/**
 * 
 * @param {Object} props 
 * @param {[Object, React.Dispatch<(prevState: Object) => Object>]} props.data pasar el usestate entero
 * @param {() => Promise<Object>} props.getList 
 * @returns 
 */
export const IngredienteList = ({ data, getList }) => {
    const [options, setOptions] = data;
    //son los nombres de las columnas
    const [columns] = useState([
        { name: 'ingrediente', title: 'Ingrediente' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'unidad', title: 'Unidad' },
        { name: 'stock', title: 'stock' },
        { name: 'acciones', title: 'acciones' },
    ]);
    const openRef = useRef(false);
    //son los datos
    const [rows, setRows] = useState([
        {
            ingrediente: 0,
            cantidad: 0,
            unidad: 'kg'
        },
        {
            ingrediente: 0,
            cantidad: 0,
            unidad: 'kg'
        },
        {
            ingrediente: 0,
            cantidad: 0,
            unidad: 'kg'
        }
    ])
    const load = async () => {
        const lista = await getList();
        setOptions(lista.lista);
        openRef.current = true;
    }
    const handleDeleteItem = (index) => {
        const newRows = [...rows]; // Create a copy of the rows array
        newRows.splice(index, 1); // Remove the item at the specified index
        setRows(newRows); // Update the rows state with the new array
    };
    useEffect(() => {
        load()
    }, [])
    const handleAddItem = () => {
        const newRows = [...rows]; // Create a copy of the rows array
        newRows.push({ cantidad: 0, ingrediente: 0, unidad: 'kg' }); // Remove the item at the specified index
        setRows(newRows); // Update the rows state with the new array

    };
    return (
        <>
            <Button
                variant="contained"
                endIcon={<Add />}
                color='success'
                onClick={handleAddItem}
            >
                Añadir ingrediente
            </Button>

            <DataTablaCustomize
                rows={rows}
                columns={columns}
            >
                <DataTypeProvider
                    for={['cantidad']}
                    formatterComponent={({ value, row, column }) => {
                        const rowIndex = rows.findIndex((r) => r === row);
                        return (<>
                            <span>
                                {rowIndex}
                            </span>
                        </>)
                    }}
                />
                <DataTypeProvider
                    for={['ingrediente']}
                    formatterComponent={({ value, row, column }) => {
                        const rowIndex = rows.findIndex((r) => r === row);
                        return (<>
                            <Autocomplete
                                options={options}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Selecciona ingrediente"
                                        variant="outlined"
                                    />
                                )}
                                getOptionLabel={(option) => option.nombreProducto}
                                value={rows[rowIndex]}
                            />
                        </>)
                    }}
                />
                <DataTypeProvider
                    for={['acciones']}
                    formatterComponent={({ value, row, column }) => {
                        const rowIndex = rows.findIndex((r) => r === row);
                        return (<>
                            <IconButton onClick={() => { handleDeleteItem(rowIndex) }}>
                                <Delete />
                            </IconButton>
                        </>)
                    }}

                />
            </DataTablaCustomize>
        </>
    )
}