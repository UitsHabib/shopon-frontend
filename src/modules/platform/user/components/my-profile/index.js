import MyProfileRoutes from "./my-profile-routes";
import MyProfile from "./components/my-profile.component";
import UpdateMyProfile from "./components/update-my-profile.component";

export function UserProfileRoutes(props) {
    return ( 
         <MyProfileRoutes path={props.path} />
     );
}

export {
    MyProfile,
    UpdateMyProfile
}
 
