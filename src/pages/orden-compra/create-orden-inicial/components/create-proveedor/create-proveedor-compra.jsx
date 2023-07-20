import { Context } from 'contexts/ContextDataTable';
import CreateProveedorModal from 'pages/proveedores/proveedores-list/components/create-proveedor';
import { proveedorInitial } from 'pages/proveedores/proveedores-list/components/proveedor-fake';
import { UseProveedor } from 'pages/proveedores/proveedores-list/hooks/useProveedor';
import React, { useEffect, useState } from 'react'

const CreateProveedorCompra = ({
    openModal,
    onClose,
    onSummit
}) => {
    const [actualizarTable, setActualizarTableContext] = useState(true);
    const [data, setData] = useState(proveedorInitial)
    const refreshDataTable = true;
    const { List, Store, Create } = UseProveedor({ refreshDataTable })
    const ApiCreate = async () => {
        const { create, status } = await Create()
        if (status) {
            setData({ ...data, codigoProveedor: create.codigo, planCuentaId: 0 });
        }
        else {
            onClose()
        }
    }
    const ApiStore = async (values) => {
        const { store, status } = await Store(values)
        if (status) {
            //ApiProveedores();
            onSummit()
            onClose()
        } else {
        }
    }
    useEffect(() => {
        if (openModal) {
            ApiCreate()
        }
    }, [openModal])

    //METODOS
    return (
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
            <CreateProveedorModal
                open={openModal}
                data={data}
                onClose={onClose}
                editProveedor={false}
                onSubmit={ApiStore}
            />
        </Context.Provider>
    )
}

export default CreateProveedorCompra
