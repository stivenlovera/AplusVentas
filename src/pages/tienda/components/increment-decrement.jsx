import { Tiny } from 'components/Typography'
import { BodyTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import QuantityButtons from 'page-sections/ecommerce/QuantityButtons'
import React from 'react'

const IncrementDecrement = ({
    cantidad,
    stock,
    onIncrement,
    onDecrement,
}) => {

    return (
        <>
            <QuantityButtons
                quantity={cantidad}
                increment={onIncrement}
                decrement={onDecrement}
            />
            <Tiny
                fontSize={10}
                mt={1}
                fontWeight={500}>
                Stock: {stock}
            </Tiny>
        </>
    )
}

export default IncrementDecrement
