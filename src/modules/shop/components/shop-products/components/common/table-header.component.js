const TableHeader = ({columns, sortColumn, onSort}) => {//sortColumn = {path: id, order: descending/ascending}
    const handleSort = ({ path, sorting }) => {
        if(!sorting) return;

        if (sortColumn.path === path) {
            if (sortColumn.order === "asc") {
              onSort({ path, order: "desc" });
            } else {
              onSort({ path, order: "asc" });
            }
          } else {
            onSort({ path, order: "asc" });
          }  
    }
    const getIcon = (path) => {
        if (sortColumn.path === path) {
          if (sortColumn.order === "asc") {
            return <i className="bi bi-arrow-up-circle-fill"/>;
          } else return <i className="bi bi-arrow-down-circle-fill"/>;
        } else return null;
      };
      //console.log(sortColumn);
    return (  
        <thead>
            <tr>
                {
                    columns.map( (column, index)=> {
                        return(
                            <th class="text-center" scope="col" key={index}
                                onClick={()=>handleSort(column)}
                            >
                                {column.label}{" "}
                                {getIcon(column.path)}
                            </th>
                        );
                    })
                }
            </tr>
        
        </thead>
    );
}
 
export default TableHeader;