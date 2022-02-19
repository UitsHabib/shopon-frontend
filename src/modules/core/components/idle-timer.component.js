import React, { useEffect, useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const IdleTimerContainer = ({ currentPathname }) => {
  const history = useHistory();
  const idleTimerWarningRef = useRef(null);
  const [warning, setWarning] = useState(false);
  const [time, setTime] = useState(60);
  const idleTime = 780000; // 13 minutes

  const onIdle = () => {
    setWarning(true);
  };

  const onActive = () => {
    setWarning(false);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    history.push({
      pathname: '/login',
      state: { from: { pathname: currentPathname }, inactive: true },
    });
  };

  useEffect(() => {
    let countDown;
    if (warning) {
      countDown = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      if (time === 0) {
        logout();
      }
    } else {
      setTime(60);
      clearInterval(countDown);
    }
    return () => clearInterval(countDown);
  }, [warning, time]);

  return (
    <IdleTimer
      ref={idleTimerWarningRef}
      timeout={idleTime}
      onIdle={onIdle}
      onActive={onActive}
    >
      <Modal
        isOpen={warning}
        onRequestClose={() => setWarning(false)}
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
            bottom: '40%',
            boxShadow: '3px 1px 29px -2px rgba(25,135,84,0.49)',
            border: '1px solid #ccc',
            overflow: 'auto',
            borderRadius: '15px',
            padding: '20px',
          },
        }}
      >
        <div className="container d-flex flex-column align-items-center text-center">
          <h1>You've been inactive for too long!</h1>
          <span className="h4">
            Move your mouse or you'll be logged out within one minute
          </span>
          <span className="h6">
            00:{time < 10 ? <span>0{time}</span> : time}
          </span>
        </div>
      </Modal>
    </IdleTimer>
  );
};

export default IdleTimerContainer;

// export const IdleTimerLogout = ({ currentPathname }) => {
//   const idleTimerRef = useRef(null);
//   const history = useHistory();
//   const idleTime = 900000; // 15 minutes
//   const onIdle = () => {
//     localStorage.removeItem('loggedInUser');
//     history.push({
//       pathname: '/login',
//       state: { from: { pathname: currentPathname }, inactive: true },
//     });
//   };

//   return (
//     <IdleTimer
//       ref={idleTimerRef}
//       timeout={idleTime}
//       onIdle={onIdle}
//     ></IdleTimer>
//   );
// };
