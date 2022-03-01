
import TableHead from "./table-header.component";
import TableBody from "./table-body.component";

const Table = ({ columns, sorting, onClickSort, items }) => {
    return (
        <table className="table">
            <TableHead
                columns={columns}
                sorting={sorting}
                onClickSort={onClickSort}
            />
            <TableBody items={items} columns={columns} />
        </table>
    );
}
 
export default Table;