import React, { useEffect, useState } from "react";
import Table from "./common/table.component";
import axios from "axios";
import _ from "lodash";
import Pagination from "./common/pagination.component";

function Roles() {
    const [roles, setRoles] = useState([]);
    const [sorters, setSorters] = useState({ key: "id", order: "asc" });
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const login = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email: "habiburrahman3089@gmail.com",
                    password: "P@ssword123",
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getRoles = async () => {
        try {
            const promise = axios.get("http://localhost:5000/api/roles", {
                withCredentials: true,
            });
            const response = await promise;
            setRoles(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        login();
        getRoles();
    }, []);

    const handleSort = (sorters, key) => {
        sorters.order = sorters.order === "asc" ? "desc" : "asc";
        setSorters({ ...sorters });
    };

    const handleClickPage = (activePage) => {
        setCurrentPage(activePage);
    };

    const sortRoles = () => {
        const rolesList = [...roles];
        const sortedRoles = _.orderBy(
            rolesList,
            [sorters.key],
            [sorters.order]
        );
        return sortedRoles;
    };

    const paginateRoles = (rolesList) => {
        const start = (currentPage - 1) * itemsPerPage;
        console.log(rolesList);
        const paginatedRoles = rolesList.slice(start, start + itemsPerPage);
        console.log(paginatedRoles);
        return paginatedRoles;
    };

    const sortedRoles = sortRoles();
    const rolesToRender = paginateRoles(sortedRoles);

    const roleColumns = [
        {
            label: "ID",
            key: "id",
            content: (role, key) => <th scope="row">{role[key]}</th>,
        },
        {
            label: "Title",
            key: "title",
            content: (role, key) => <td scope="row">{role[key]}</td>,
        },
        {
            label: "Created At",
            key: "created_at",
            content: (role, key) => <td scope="row">{role[key]}</td>,
        },
    ];
    return (
        <>
            <div className="container text-center d-flex justify-content-center align-items-center flex-column">
                <div className="w-75">
                    <Table
                        items={rolesToRender}
                        columns={roleColumns}
                        sorters={sorters}
                        onSort={handleSort}
                    />
                </div>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={sortedRoles.length}
                    currentPage={currentPage}
                    onClickPage={handleClickPage}
                />
            </div>
        </>
    );
}

export default Roles;
