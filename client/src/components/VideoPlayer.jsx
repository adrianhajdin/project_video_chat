import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';

import { SocketContext } from '../Context';

import useStyles from './VideoStyles';

const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper style={{ padding: '10px', border: '2px solid black' }}>
          <Grid item xs={12} md={6} align="center">
            {/* <Typography variant="h5" gutterBottom align="left">{name || 'Name'}</Typography> */}
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper style={{ padding: '10px', border: '2px solid black' }}>
          <Grid item xs={12} md={6} align="center">
            <Typography variant="h6" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
