import React, { useState, useContext } from 'react';
import { Button, IconButton, TextField, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import Peer from 'simple-peer';

import { UserContext } from '../Context';

const Sidebar = () => {
  const { me, socket, callAccepted, setCallAccepted, userVideo, connectionRef, stream, name, setName, callEnded, setCallEnded } = useContext(UserContext);
  const [idToCall, setIdToCall] = useState('');

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
  };

  return (
    <Paper style={{ flexDirection: 'column' }}>
      <TextField label="Name" variant="filled" value={name} onChange={(e) => setName(e.target.value)} />
      <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
        <Button variant="contained" color="primary" startIcon={<Assignment fontSize="large" />}>
          Copy ID
        </Button>
      </CopyToClipboard>
      <TextField label="ID to call" variant="filled" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
      <div>
        {callAccepted && !callEnded ? (
          <IconButton variant="contained" color="secondary" onClick={leaveCall}>
            <PhoneDisabled fontSize="large" />
          </IconButton>
        ) : (
          <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
            <Phone fontSize="large" />
          </IconButton>
        )}
        {idToCall}
      </div>
    </Paper>
  );
};

export default Sidebar;
