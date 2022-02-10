import axios from "axios";

async function DeleteUser(userId)  {
    try{
        console.log(userId);
        const response = await axios.delete(`http://localhost:5000/api/users/${userId}` , { withCredentials: true });
         console.log("delete response ", response);
        alert(`User ${userId} deleted`);   
    }
    catch(error){
        alert(`Could not delete User ${userId}`);   

        console.log(error);
    }
}
 
export default DeleteUser;