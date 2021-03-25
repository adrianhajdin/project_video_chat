import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { SocketContext } from '../Context';

import useStyles from './VideoStyles';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Grid item xs={12} md={6} align="center">
          <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6} align="center">
          <Typography variant="h6" gutterBottom>{call.name || 'Name'}</Typography>
          <video playsInline ref={userVideo} autoPlay className={classes.video} />
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
