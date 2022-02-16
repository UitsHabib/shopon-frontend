import React, { useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import { useHistory } from 'react-router-dom';
import { Logout } from '../../platform';

const IdleTimerContainer = ({ currentPathname }) => {
    const idleTimerRef = useRef(null);
    const history = useHistory();
    const idleTime = 900000; // 15 minutes
    const onIdle = () => {
        localStorage.removeItem('loggedInUser');
        history.push({ pathname: '/login', state: { from: { pathname: currentPathname }, inactive: true } });
    };

    return <IdleTimer ref={idleTimerRef} timeout={idleTime} onIdle={onIdle}></IdleTimer>;
};

export default IdleTimerContainer;
