import React, { useState, useContext } from 'react';
import { Button, IconButton, TextField, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { UserContext } from '../Context';

const Sidebar = () => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(UserContext);
  const [idToCall, setIdToCall] = useState('');

  console.log(me);

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
