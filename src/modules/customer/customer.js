import React, { useEffect, useState } from "react";
import CustomerData from "./data/customer";
import { useRouteMatch } from "react-router-dom";
import Table from "./components/common/table.component";
import Pagination from "./components/common/pagination.component";
import Dropdown from "react-bootstrap/Dropdown";
import _ from "lodash";
import ConfirmDelete from "./components/confirmdelete.component";
import UpdateCustomer from "./components/updateCustomer.component";

const Customer = () => {
    const [customer, setcustomer] = useState([]);
    const [sortColumn, setSortColumn] = useState({
        path: "id",
        order: "asc",
    });
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(10);

    const [isDelete, setisDelete] = useState(false);
    const [customerToBeDeleted, setcustomerToBeDeleted] = useState(null);
    const [isUpdated, setisUpdated] = useState(false);
    const [customerToBeUpdated, setcustomerToBeUpdated] = useState(null);

    const columns = [
        {
            label: "Id",
            path: "id",
            sorting: true,
            content: (customer, key) => (
                <td style={{ color: "#136CB2" }}> {customer[key]}</td>
            ),
        },
        {
            label: "first Name",
            path: "first_name",
            sorting: true,
            content: (customer, key) => (
                <td style={{ color: "#136CB2" }}>{customer[key]}</td>
            ),
        },
        {
            label: "Last Name",
            path: "last_name",
            sorting: true,
            content: (customer, key) => (
                <td style={{ color: "#136CB2" }}>{customer[key]}</td>
            ),
        },
        {
            label: "Email",
            path: "email",
            sorting: true,
            content: (customer, key) => (
                <td style={{ color: "#136CB2" }}>{customer[key]}</td>
            ),
        },
        {
            label: "Gender",
            path: "gender",
            sorting: true,
            content: (customer, key) => (
                <td style={{ color: "#136CB2" }}>{customer[key]}</td>
            ),
        },
        {
            label: "ip_address",
            path: "ip_address",
            sorting: true,
            content: (customer, key) => (
                <td style={{ color: "#136CB2" }}>{customer[key]}</td>
            ),
        },

        {
            label: "Action",
            path: "action",
            content: (customer, key) => (
                <td>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                        >
                            <i className="bi bi-pencil-square"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    setcustomerToBeUpdated(customer);
                                    setisUpdated(true);
                                }}
                            >
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setcustomerToBeDeleted(customer);
                                    setisDelete(true);
                                }}
                            >
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            ),
        },
    ];

    async function getCustomer() {
        try {
            setcustomer(CustomerData);
        } catch (error) {
            console.log("abuj", error);
        }
    }

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };

    const handleClickPage = (activePage) => {
        setActivePage(activePage);
    };

    const paginateCustomer = (Customer) => {
        const start = (activePage - 1) * pageCount;
        const paginateCustomer = Customer.slice(start, start + pageCount);
        return paginateCustomer;
    };

    const sortCustomer = (Customer) => {
        const sortedCustomer = _.orderBy(
            Customer,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedCustomer;
    };

    const paginatedCustomer = paginateCustomer(customer);
    const sortedCustomer = sortCustomer(paginatedCustomer);

    // delete a customer
    const handleDeleteCustomer = (singleCustomer) => {
        const copyCus = [...customer];
        const newCus = copyCus.filter((item) => item.id !== singleCustomer.id);
        setcustomer(newCus);
        setisDelete(false);
    };
    const handleCalceldelete = () => {
        console.log("cancel button pressed");
        setisDelete(false);
    };

    //Update a Customer

    const handleUpdateProfile = (item) => {
        const copyCus = [...customer];
        let foundIndex = copyCus.findIndex((x) => x.id === item.id);
        copyCus[foundIndex] = item;
        console.log(foundIndex);
        setcustomer(copyCus);
        setisUpdated(false);
        customerToBeUpdated(null);
    };
    const handleCloseUpdatedModal = () => {
        setisUpdated(false);
        customerToBeUpdated(null);
    };

    useEffect(() => {
        getCustomer();
    }, []);

    return (
        <>
            <div>
                <nav className="navbar navbar-light bg-light">
                    <h1 className="navbar-brand" style={{ marginLeft: "20px" }}>
                        Customer List
                    </h1>
                </nav>
            </div>
            <div style={{ display: "flex" }}>
                <div className="container">
                    <Table
                        items={sortedCustomer}
                        columns={columns}
                        onSort={handleSort}
                        sortColumn={sortColumn}
                    ></Table>

                    <Pagination
                        totalItems={customer.length}
                        pageCount={pageCount}
                        activePage={activePage}
                        onClickPage={handleClickPage}
                    ></Pagination>
                </div>
                {customerToBeDeleted && (
                    <ConfirmDelete
                        handleCancel={handleCalceldelete}
                        deleteProfile={handleDeleteCustomer}
                        isDelete={isDelete}
                        item={customerToBeDeleted}
                    />
                )}
                {customerToBeUpdated && (
                    <UpdateCustomer
                        onUpdateProfile={handleUpdateProfile}
                        isUpdate={isUpdated}
                        item={customerToBeUpdated}
                        onCloseModal={handleCloseUpdatedModal}
                    />
                )}
            </div>
        </>
    );
};

export default Customer;
