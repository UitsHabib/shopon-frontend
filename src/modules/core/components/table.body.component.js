import React from 'react';


const TableBody = ({ users: rows, columns }) => {
    
    return (
        <tbody>
            {
                rows.map(row => (
                    <tr key={row.path}>
                        {
                           columns.map( column =>{
                               return column.content(row,column.path);
                           })
                        }
                    </tr>
                ))
            }
        </tbody>
    );
}
 
export default TableBody;