import React from 'react';
import { useMemo, useState } from 'react';
import { useTable, useExpanded } from 'react-table';

//css
import './reactTable.css';

const ReactTable = (options) => {


    const columns = useMemo(() => options.columns, [options.columns]);
    const data = useMemo(() => options.data, [options.data]);
    
    const tableInstance = useTable({ columns, data, useExpanded });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div>
            <div className='mainTable_container'>
                { options.data.length>0 && options.data? 
                 <table className={'table_list_wraper'} {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))

                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                          rows?.map((row) => {
                                prepareRow(row);
                                return (
                                    <React.Fragment key={row}>
                                        <>
                                            <tr {...row.getRowProps()}>
                                                {
                                                    row.cells.map((cell, index) => {
                                                        return (
                                                            <>
                                                                <td
                                                                    key={`clickable${index}`}
                                                                    {...cell.getCellProps()}
                                                                >
                                                                    {cell.render(
                                                                        'Cell'
                                                                    )}
                                                                </td>
                                                            </>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </>
                                    </React.Fragment>
                                );
                            })
                        }

                    </tbody>
                </table> : null}

            </div>
        </div>
    );
};

export default ReactTable;