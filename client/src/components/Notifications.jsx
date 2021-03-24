import React, { useContext } from 'react';
import { Button, Container } from '@material-ui/core';

import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <Container maxWidth="md">
      {call.isReceivingCall && !callAccepted && (
        <Container align="center">
          <h1>{call.name} is calling...</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Notifications;
