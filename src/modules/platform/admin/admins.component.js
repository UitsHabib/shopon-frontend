import {useEffect, useState} from 'react';
import axios from 'axios';
import getColumns from './admin.table.columns';
import Table from '../../core/components/table.component';
import Pagination from '../../core/components/pagination.component';
import _ from 'lodash';

const Admins = () => {
    const [admin, setAdmin] = useState({
        email: "habiburrahman3089@gmail.com",
        password: "P@ssword123"
    });

    const [users, setUsers] = useState({
       admins:[],
       sortColumns: {
        path: "profile_id",
        order: "asc",
      },
      activePage: 1,
      pageCount: 3
    });
    const columns = getColumns();

    const handleSort = (sortColumns) => {
        setUsers((prevState) => ({
          ...prevState,
          sortColumns: sortColumns
        }))
    };
    const sortUsers = (admins) => {
        const sortColumn = users.sortColumns;
        const sortedUsers = _.orderBy(
          admins,
          [sortColumn.path],
          [sortColumn.order]
        );
        return sortedUsers;
    };
    const handleClickPage = (activePage) => {
        setUsers((prevState) => ({
          ...prevState,
          activePage: activePage
        }));
      };

    const paginatedUsers = (user) => {
        const { activePage, pageCount } = users;
        const start = (activePage - 1) * pageCount;
        const paginatedUsers = user.slice(start, start + pageCount);
        return paginatedUsers;
    };
    async function forceLogin(loginCredentials) {
       
        try{
            const loginPromise = axios.post( "http://localhost:5000/api/login",loginCredentials,{withCredentials: 'true'});
        }catch{
            console.log('error while logging in');
        }     
    }

    async function getUsers() {
        
        try{
            const adminsAPIpromise = axios.get('http://localhost:5000/api/users',{withCredentials: 'true'});
            const adminsResponse = await adminsAPIpromise;
            setUsers((prevState) => ({
                ...prevState,
                admins: adminsResponse.data
            }));
        }
        catch{
            console.log('error while getting users');
        }     
    }

    const paginatedUser = paginatedUsers(users.admins);
    const admins = sortUsers(paginatedUser);
    
    useEffect(()=>{
        forceLogin(admin);
        getUsers();
    },[]);

    return ( 
        <>
            <Table
                users={admins}
                columns={columns}
                sortColumns={users.sortColumns}
                onSort={handleSort}
            />
            <Pagination
                totalUsers={users.admins.length}
                pageCount={users.pageCount}
                activePage={users.activePage}
                onClickPage={handleClickPage}
            />
        </>
     );
}
 
export default Admins;