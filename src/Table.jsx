import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Defining fetchData outside of useEffect to make it accessible in handleDelete
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3002/userlist');
            const jsonData = await response.json();

            console.log(jsonData);
            setData(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); //fetching userlist first time
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                 Header: 'First Name',
                 accessor: 'first_name'
            },
            {
                 Header: 'Last Name',
                 accessor: 'last_name'
            },
            {
                Header: 'UserName',
                accessor: 'username'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Project ',
                accessor: 'project_name'
               
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state: { pageIndex },
        pageCount,
        gotoPage
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 }
        },
        useSortBy,
        usePagination
    );

    const handleEdit = (id) => {
        navigate(`/edit-user/${id}`);
    };

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://127.0.0.1:3002/deleteuser/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
    
            // Re-fetching the user list to update the table
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const handleAddUser = () => {
        navigate('/add-user')
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <button className="btn btn-primary" onClick={handleAddUser}>ADD USER</button>


            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {column.isSorted && (
                                        <span>{column.isSortedDesc ? ' ⬆' : ' ⬇'}</span>
                                    )}
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(row.original.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(row.original.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="btn-container">
                <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
                    First
                </button>
                <button disabled={!canPreviousPage} onClick={previousPage}>
                    Prev
                </button>
                <span>
                    {pageIndex + 1} of {pageCount}
                </span>
                <button disabled={!canNextPage} onClick={nextPage}>
                    Next
                </button>
                <button disabled={pageIndex === pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>
                    Last
                </button>
            </div>
        </div>
    );
};

export default Table;













