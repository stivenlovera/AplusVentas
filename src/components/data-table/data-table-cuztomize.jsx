import { DataTypeProvider, IntegratedFiltering, IntegratedPaging, IntegratedSorting, PagingState, SearchState, SortingState } from "@devexpress/dx-react-grid";
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar } from "@devexpress/dx-react-grid-material-ui";
import { IconButton, Paper } from "@mui/material";
import { useState } from "react";

export const CurrencyFormatter = ({ value, row, column, onClicks }) => {
    return (
        <>
            {
                onClicks != null ? (
                    onClicks.map(
                        (metodo, i) => {
                            return (
                                <IconButton onClick={() => { metodo.onClick(row) }} key={i}>
                                    {metodo.icon}
                                </IconButton>
                            )
                        }
                    )
                ) : ({ value })
            }
        </>
    )
};

export const DataTablaCustomize = (props) => {
    const { rows, columns, tableColumnExtensions, onClicks, AccionColumn, children } = props
    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={({ value, row, column }) => CurrencyFormatter({ value, row, column, onClicks })}
            {...props}
        />
    );
    // columns.map(x=> { columnName: x.name, width: 200, wordWrapEnabled: true, align: 'left' })
    const [currencyColumns] = useState([AccionColumn]);
    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                {children}
                {/* data format */}
                <CurrencyTypeProvider
                    for={currencyColumns}
                />
                {/* <CurrencyTypeProvider
                    for={currencyColumns}
                /> */}
                {/* sort columns*/}
                <SortingState
                    defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
                />
                <IntegratedSorting />
                {/* paggin */}
                <PagingState
                    defaultCurrentPage={0}
                    pageSize={5}
                />
                <IntegratedPaging />
                <PagingPanel />
                {/* buscador */}
                <SearchState defaultValue="" />
                <IntegratedFiltering />
                <Toolbar />
                <SearchPanel />
                {/* table */}
                <Table columnExtensions={tableColumnExtensions == null ? [] : tableColumnExtensions} />
                <TableHeaderRow showSortingControls />
            </Grid>
        </Paper>
    )
}