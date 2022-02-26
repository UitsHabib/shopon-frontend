import React  from 'react';
import Profiles  from './components/profiles.component';
import CreateProfile from './components/common/create-profile.component';
import ProfileRoutes from './profile.routes';
import profileReducer from './profile.reducer';
import * as profileActions from './profile.actions';

export function ProfileClientRoutes(props) {
    return <ProfileRoutes path={props.path} />;
}

export {
    Profiles,
    CreateProfile,
    profileReducer,
    profileActions,
};
