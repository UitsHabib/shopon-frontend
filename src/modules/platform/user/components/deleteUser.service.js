import axios from "axios";

async function DeleteUser(userId , setUserDeleted , user)  {
    try{
        console.log(userId);
        const response = await axios.delete(`http://localhost:5000/api/users/${userId}` , { withCredentials: true });
         console.log("delete response ", response);
        alert(`User ${user.first_name} ${user.last_name}  deleted`); 
        setUserDeleted();  
    }
    catch(error){
        alert(`Could not delete User ${userId}`);   

        console.log(error);
    }
}
 
export default DeleteUser;