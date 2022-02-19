import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-modal';
import moment from 'moment';

import Table from './common/table.component';
import Pagination from './common/pagination.component';

Modal.setAppElement('#app');

function Roles() {
  const [roles, setRoles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sorters, setSorters] = useState({ key: 'id', order: 'asc' });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalDetails, setIsModalDetails] = useState(false);
  const [currentRole, setCurrentRole] = useState({});
  const [roleToDelete, setRoleToDelete] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const roleColumns = [
    {
      label: 'ID',
      key: 'id',
      sortable: 'true',
      content: (role, key) => <th scope="row">{role[key]}</th>,
    },
    {
      label: 'Title',
      key: 'title',
      sortable: 'true',
      content: (role, key) => <td scope="row">{role[key]}</td>,
    },
    {
      label: 'Created At',
      key: 'created_at',
      content: (role, key) => (
        <td scope="row">{moment(role[key]).format('lll')}</td>
      ),
    },
    {
      label: 'Action',
      key: 'action',
      content: (role, key) => (
        <td scope="row">
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              size="sm"
              id="dropdown-basic"
              bsPrefix="0"
            >
              {/* <i className="bi bi-pencil-square"></i> */}
              <i className="bi bi-box-arrow-down text-success fa-lg" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDetails(role, key)}>
                Details
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/platform/roles/update/${role.id}`}>
                Edit
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={() => deleteRole(role.id)}> */}
              <Dropdown.Item onClick={() => deleteWarning(role)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      ),
    },
  ];

  const pageOptions = _.range(5, 25, 5);

  const getRoles = async () => {
    try {
      const promise = axios.get('http://localhost:5000/api/roles', {
        withCredentials: true,
      });
      const response = await promise;
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
    if (roles) setIsLoaded(true);
  };

  const deleteRole = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/roles/${id}`,
        { withCredentials: true }
      );
      const newRoles = [...roles].filter((role) => id !== role.id);
      setRoles(newRoles);
      setDeleteConfirmation(false);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const deleteWarning = (role) => {
    setRoleToDelete(role);
    setDeleteConfirmation((now) => !now);
    console.log(deleteConfirmation);
  };

  const cancelDelete = () => {
    setDeleteConfirmation((now) => !now);
  };

  const handleSort = (sorters) => {
    setSorters({ ...sorters });
  };

  const handleClickPage = (activePage) => {
    setCurrentPage(activePage);
  };

  const handleDetails = (role, key) => {
    setIsModalDetails(true);
    setCurrentRole(role);
  };

  const handleCloseModal = () => {
    setIsModalDetails(false);
  };

  const sortRoles = () => {
    const rolesList = [...roles];
    const sortedRoles = _.orderBy(rolesList, [sorters.key], [sorters.order]);
    return sortedRoles;
  };

  const paginateRoles = (rolesList) => {
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedRoles = rolesList.slice(start, start + itemsPerPage);
    return paginatedRoles;
  };

  useEffect(() => {
    getRoles();
  }, []);

  const sortedRoles = sortRoles();
  const rolesToRender = paginateRoles(sortedRoles);

  return (
    <>
      {isLoaded ? (
        <div className="container text-center d-flex justify-content-center align-items-center flex-column">
          {roles.length ? (
            <>
              <Modal
                isOpen={deleteConfirmation}
                onRequestClose={() => cancelDelete()}
                style={{
                  overlay: {
                    position: 'fixed',
                    zIndex: '4',
                    backdropFilter: 'blur(8px)',
                  },
                  content: {
                    top: '30%',
                    left: '20%',
                    right: '20%',
                    bottom: '30%',
                    boxShadow: '3px 1px 29px -2px rgba(25,135,84,0.49)',
                    border: '1px solid #ccc',
                    overflow: 'auto',
                    borderRadius: '15px',
                    padding: '20px',
                  },
                }}
              >
                <div className="container d-flex flex-column align-items-center">
                  <h1>Delete Role</h1>
                  <p>Are you sure you want to delete this role?</p>

                  <div className="clearfix">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger mx-2"
                      onClick={() => deleteRole(roleToDelete.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
              <div className="w-100">
                <Table
                  items={rolesToRender}
                  columns={roleColumns}
                  sorters={sorters}
                  onSort={handleSort}
                  isModal={isModalDetails}
                  clickedRow={currentRole}
                  onCloseModal={handleCloseModal}
                  onDeleteRow={deleteRole}
                />

                <div className="d-flex flew-row w-25">
                  <label className="mx-2">Show:</label>
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    value={itemsPerPage}
                  >
                    {pageOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                    {/* <option defaultValue={5}>5</option>
										<option value={10}>10</option>
										<option value={15}>15</option> */}
                  </select>
                </div>
              </div>

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={sortedRoles.length}
                currentPage={currentPage}
                onClickPage={handleClickPage}
              />
            </>
          ) : (
            <div
              className="container d-flex flex-column justify-content-center align-items-center"
              style={{ height: '50vh' }}
            >
              <h1 className="display-4 text-center">
                Sorry! Roles list is empty!
              </h1>
              <h1 className="display-4 text-center">
                Please create some roles first!
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div
            className="spinner-border"
            role="status"
            style={{ height: '100px', width: '100px' }}
          >
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </>
  );
}

export default Roles;
