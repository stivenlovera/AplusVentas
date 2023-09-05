import React from 'react'
import Homologar from './homologar';
import { useParams } from 'react-router-dom';

const IndexHomolar = () => {
    const { productoId } = useParams();
    return (
        <>
            <Homologar
                productoId={productoId} />
        </>
    )
}

export default IndexHomolar
