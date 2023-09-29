import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { Add } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import AutocompleteAsync from "components/AutocompleteAsync";
import { DataTablaCustomize } from "components/data-table/data-table-cuztomize"
import { useEffect, useRef, useState } from "react";
import React from 'react';
import { UseProducto } from "pages/productos/hooks/useProducto";

/**
 * 
 * @param {Object} props 
 * @param {[Object, React.Dispatch<(prevState: Object) => Object>]} props.data pasar el usestate entero
 * @param {() => Promise<Object>} props.getList 
 * @returns 
 */
export const IngredientesList = ({ data, getList }) => {
    const [options, setOptions] = data;
    //son los nombres de las columnas
    const [columns] = useState([
        { name: 'ingrediente', title: 'Ingrediente' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'unidad', title: 'Unidad' },
        { name: 'stock', title: 'stock' },
    ]);
    const openRef = useRef(false);
    //son los datos
    const [rows, setRows] = useState([
        {
            ingrediente: 0,
            cantidad: 0,
            unidad: 0
        }
    ])
    const load = async () => {
        const lista = await getList();
        setOptions(lista.lista);
        openRef.current = true;
    }
    useEffect(() => {
        load()
    }, [])
    const handleAddItem = () => {
        rows.push({
            ingrediente: 0,
            cantidad: 0,
            unidad: 0
        });
        setRows({ ...rows })
    };
    return (
        <>
            <Button
                variant="contained"
                endIcon={<Add />}
                color='success'
                onClick={handleAddItem}
            >
                Añadir item
            </Button>

            <DataTablaCustomize
                rows={rows}
                columns={columns}
            >
                <DataTypeProvider
                    for={['usuarioId']}
                    formatterComponent={({ value, row, column }) => {
                        return (<>

                        </>)
                    }}
                />
                <DataTypeProvider
                    for={['ingrediente']}
                    formatterComponent={({ value, row, column }) => {
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
                            />
                        </>)
                    }}
                />
                <DataTypeProvider
                    for={['unidad']}
                    formatterComponent={({ value, row, column }) => {
                        return (<>

                        </>)
                    }}
                />
            </DataTablaCustomize>
        </>
    )
}