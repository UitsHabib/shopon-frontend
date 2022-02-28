import React from "react";

const TableBody = ({ items, columns }) => {
    return (
        <>
            <tbody>
                {items.map((item, index) => {
                    return (
                        <tr key={index}>
                            {columns.map((col, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {col.content(item, col.path)}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
}

export default TableBody;