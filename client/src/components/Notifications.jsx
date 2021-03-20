import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { UserContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(UserContext);

  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling...</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
