import React  from 'react';
import Profiles  from './components/profiles.component'
import ProfileRoutes from './profile.routes';

export function ProfileClientRoutes(props) {
    return <ProfileRoutes path={props.path} />;
}

export {
    Profiles
};
