import TableBody from "./table.body.component";
import TableHeader from "./table.header.component";

const Table = (props) => {
  const { users, columns, sortColumns, onSort } = props;
   
  return (
    <>
      <table className="container table table-bordered table-hover" >
        <TableHeader
          columns={columns}
          sortColumns={sortColumns}
          onSort={onSort}
        />
        <TableBody users={users} columns={columns} />
      </table>
    </>
  );
};

export default Table;
