import { Add } from "@mui/icons-material"
import { Box, Button, Card, Grid, Table, TableBody, TableHead, TableRow } from "@mui/material"
import Scrollbar from "components/ScrollBar"
import { H5 } from "components/Typography"
import { FieldArray, useFormikContext } from "formik"
import { BodyTableCell, HeadTableCell } from "page-sections/accounts/account/common/StyledComponents"
import React from "react"
import AppTextField2 from "./AppTextField2"
import { AutocompleteId } from "./AutoCompleteId"
/**
 * 
 * @param {Object} props
 * @param {string} props.name
 * @param {Array<{title:string,name:string,mode:string,list:[],listName:string,labelName:string,label,labelUndefined}>} props.columns 
 * @returns 
 */
export const InputTable = ({ name, columns }) => {
    const formik = useFormikContext();
    const { values, touched, errors, handleChange, handleBlur } = formik;
    const inputMode = (index, column) => {
        switch (column.mode) {
            case 'input':
                return (<>
                    <AppTextField2
                        name={`${name}[${index}].` + column.name}
                        value={values[name][index][column.name]}
                        hideTitle
                        placeholder={column.title}
                    />
                </>)
                break;
            case 'autocomplete':
                return (<AutocompleteId
                    label={column.label}
                    labelUndefined={column.labelUndefined}
                    labelName={column.labelName}
                    name={column.listName}
                    options={column.list}
                />)
                break;

        }

    }
    return (
        <>
            <Grid item md={8} xs={12}>
                <Card sx={{
                    padding: 3
                }}>
                    <H5>Lista de Productos </H5>
                    <Grid container spacing={3}>
                        <Grid item sm={12} xs={12}>
                            <Box my={3}>
                                <Scrollbar autoHide={false}>
                                    <Table sx={{
                                        minWidth: 700
                                    }}>
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    columns.map(x => (
                                                        <HeadTableCell>{x.title}</HeadTableCell>
                                                    )
                                                    )
                                                }
                                            </TableRow>
                                        </TableHead>

                                        <FieldArray name={name} render={(arrayHelpers) => {
                                            console.log(values[name])
                                            console.log(name)
                                            return (
                                                <TableBody >
                                                    {
                                                        values[name] && values[name].length > 0 ? (
                                                            values[name].map((value, index) =>
                                                            (
                                                                <TableRow>
                                                                    {
                                                                        columns.map((column) => {
                                                                            return (
                                                                                <BodyTableCell>
                                                                                    {inputMode(index, column)}
                                                                                </BodyTableCell>
                                                                            )
                                                                        }
                                                                        )
                                                                    }

                                                                </TableRow>
                                                            )
                                                            )) : null
                                                    }
                                                </TableBody >
                                            )
                                        }} />
                                    </Table>
                                </Scrollbar>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

        </>
    )


}