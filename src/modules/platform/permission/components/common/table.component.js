import TableHead from "./tableHead.component";
import TableBody from "./tableBody.component";

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