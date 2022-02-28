import React  from 'react';
import Profiles  from './components/profiles.component';
import ProfileRoutes from './profile.routes';
import profileReducer from './profile.reducer';
import * as profileActions from './profile.actions';

export function ProfileClientRoutes(props) {
    return <ProfileRoutes path={props.path} />;
}

export {
    Profiles,
    profileReducer,
    profileActions,
};
