import { DataTypeProvider, IntegratedFiltering, IntegratedPaging, IntegratedSorting, PagingState, SearchState, SortingState } from "@devexpress/dx-react-grid";
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar } from "@devexpress/dx-react-grid-material-ui";
import { IconButton, Paper } from "@mui/material";
import { useState } from "react";

export const CurrencyFormatter = ({ value, row, column, onClicks }) => {
    return (
        <>
            {
                onClicks.map(
                    (metodo) => {
                        return (
                            <IconButton onClick={() => { metodo.onClick(row) }}>
                                {metodo.icon}
                            </IconButton>
                        )
                    }
                )
            }
        </>
    )
};

export const DataTablaStandar = ({ rows, columns, tableColumnExtensions, onClicks, AccionColumn }) => {
    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={({ value, row, column }) => CurrencyFormatter({ value, row, column, onClicks })}
            {...props}
        />
    );
    const [currencyColumns] = useState([AccionColumn]);
    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                {/* data format */}
                <CurrencyTypeProvider
                    for={currencyColumns}
                />
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
                <Table columnExtensions={tableColumnExtensions} />
                <TableHeaderRow showSortingControls />
            </Grid>
        </Paper>
    )
}