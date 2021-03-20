import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import Peer from 'simple-peer';

import { UserContext } from '../Context';

const Notifications = () => {
  const { call, callAccepted, socket, setCallAccepted, stream, connectionRef, userVideo } = useContext(UserContext);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

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
