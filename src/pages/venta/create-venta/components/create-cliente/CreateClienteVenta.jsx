import { Context } from 'contexts/ContextDataTable';
import { initialStateCliente } from 'pages/clientes/clientes-list/components/cliente-fake';
import CreateClienteModal from 'pages/clientes/clientes-list/components/create-cliente';
import { UseCliente } from 'pages/clientes/hooks/useCliente';
import React, { useEffect, useState } from 'react'

const CreateClienteVenta = ({
    openModal,
    onClose,
    onSummit
}) => {
    const [actualizarTable, setActualizarTableContext] = useState(true);
    const [create, setCreate] = useState(initialStateCliente)
    const { onCreate, onStore } = UseCliente()
    const ApiCreate = async () => {
        const { data, status } = await onCreate()
        if (status) {
            setCreate({ ...create, codigoCliente: data.codigoCliente });
        }
        else {
            onClose()
        }
    }
    const ApiStore = async (values) => {
        const { data, status } = await onStore(values)
        if (status) {
            onSummit()
            onClose()
        } else {
        }
    }
    useEffect(() => {
        ApiCreate()
    }, [openModal])

    //METODOS
    return (
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
            <CreateClienteModal
                open={openModal}
                onSubmit={ApiStore}
                editCliente={false}
                onClose={onClose}
                data={create}
            />
        </Context.Provider>
    )
}

export default CreateClienteVenta
