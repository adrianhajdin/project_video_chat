import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Sidebar = () => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container style={{ width: '500px', marginTop: '50px' }}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container style={{ width: '100%' }}>
          <Grid item xs={6} style={{ padding: 20 }}>
            <Typography gutterBottom variant="h6">Account Info</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <CopyToClipboard text={me} style={{ marginTop: 20 }}>
              <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                Copy Your ID
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={6} style={{ padding: 20 }}>
            <Typography gutterBottom variant="h6">Make a call</Typography>
            <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} style={{ marginTop: 20 }}>
                Hang Up
              </Button>
            ) : (
              <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} style={{ marginTop: 20 }}>
                Call
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Sidebar;
