import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import _ from "lodash";
import Table from "./common/table.component";
import TableBody from "./common/tableBody.component";
import TableHead from "./common/tableHead.component";

const Permission = ({ location, match }) => {
    const [data, setData] = useState({});
    const [sorting, setSorting] = useState({ path: "id", order: "asc" });

    const getData = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/permissions/${match.params.id}`,
                { withCredentials: true }
            );
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [match.params.id]);

    useEffect(() => {
        if (location.data) {
            setData(location.data);
        } else {
            getData();
        }
    }, [location.data, getData]);

    const sortedData = _.orderBy(
        data.permission_services,
        [sorting.path],
        [sorting.order]
    );

    const columns = [
        {
            label: "ID",
            path: "user-id",
            content: (permission, path) => <td>{permission.id}</td>,
        },
        {
            label: "Service ID",
            sort: true,
            path: "id",
            content: (permission, path) => <td>{permission.service[path]}</td>,
        },
        {
            label: "Service Title",
            path: "title",
            content: (permission, path) => <td>{permission.service[path]}</td>,
        },
        {
            label: "Service Slug",
            path: "slug",
            content: (permission, path) => <td>{permission.service[path]}</td>,
        },
    ];

    return (
        <div className="container permission">
            <div className="row justify-content-center">
                <div className="col-10">
                    <h3 className="text-center">{data.title}</h3>
                    <p>{data.description}</p>
                    <Table>
                        <TableHead
                            columns={columns}
                            sorting={sorting}
                            onSort={setSorting}
                        />
                        <TableBody items={sortedData} columns={columns} />
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Permission;
