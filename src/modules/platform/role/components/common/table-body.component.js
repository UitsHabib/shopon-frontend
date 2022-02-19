import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

Modal.setAppElement('#app');

const TableBody = (props) => {
  const { items: rows, columns, isModal, clickedRow, onCloseModal } = props;
  const [users, setUsers] = useState([]);

  const fetchUsers = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/users`, {
        withCredentials: true,
      });
      setUsers(data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const capitalizeKey = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Modal
        isOpen={isModal}
        onRequestClose={() => onCloseModal()}
        style={{
          overlay: {
            position: 'fixed',
            zIndex: '4',
            backdropFilter: 'blur(8px)',
          },
          content: {
            top: '10%',
            left: '20%',
            right: '20%',
            bottom: '10%',
            boxShadow: '3px 1px 29px -2px rgba(25,135,84,0.49)',
            border: '1px solid #ccc',
            overflow: 'auto',
            borderRadius: '15px',
            padding: '20px',
          },
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="btn align-self-end">
            <i className="bi bi-x-circle h3" onClick={() => onCloseModal()} />
          </button>
          <ul className="list-group list-group-flush w-75" style={{}}>
            {Object.entries(clickedRow).map(([key, value]) => {
              if (key === 'created_by' || key === 'updated_by') {
                let user = users.find((user) => user.id === value);
                user = user.first_name + ' ' + user.last_name;
                return (
                  <li
                    className="list-group-item d-flex flew-row align-items-baseline"
                    key={key}
                  >
                    <span className="text-primary h6 m-0 p-0 mx-1">
                      {capitalizeKey(key)}:
                    </span>
                    <span className="m-0 p-0"> {user}</span>
                  </li>
                );
              } else if (key === 'created_at' || key === 'updated_at') {
                return (
                  <li
                    className="list-group-item d-flex flew-row align-items-baseline"
                    key={key}
                  >
                    <span className="text-primary h6 m-0 p-0 mx-1">
                      {capitalizeKey(key)}:
                    </span>
                    <span className="m-0 p-0">
                      {' '}
                      {moment(value).format('lll')}
                    </span>
                  </li>
                );
              } else if (key === 'role_permissions') {
                return (
                  <li
                    className="list-group-item d-flex flex-row align-items-baseline"
                    key={key}
                  >
                    <span className="text-primary h6 m-0 p-0 mx-1">
                      Permissions
                    </span>
                    :
                    {value.map((data) => {
                      return (
                        <span
                          key={data.id}
                          className="d-flex flex-row align-items-center "
                        >
                          {data.permission.title}
                        </span>
                      );
                    })}
                  </li>
                );
              }
              return (
                <li
                  className="list-group-item d-flex flew-row align-items-baseline"
                  key={key}
                >
                  <span className="text-primary h6 m-0 p-0 mx-1">
                    {capitalizeKey(key)}:
                  </span>
                  <span className="m-0 p-0"> {value}</span>
                </li>
              );
            })}
          </ul>

          {/* <div className="mt-2">
						<Link
							className="btn btn-success"
							to={`/platform/roles/update/${clickedRow.id}`}
						>
							Update
						</Link>
						<button
							className="btn btn-outline-danger mx-3"
							onClick={() => deleteRow(clickedRow.id)}
						>
							Delete
						</button>
					</div> */}
        </div>
      </Modal>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              {columns.map((data) => (
                <React.Fragment key={row.id + data.key}>
                  {data.content(row, data.key)}
                </React.Fragment>
              ))}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default TableBody;
