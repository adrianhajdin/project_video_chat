import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { SocketContext } from '../Context';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  console.log(call);
  return (
    <Grid container>
      {stream && (
        <Grid item xs={callAccepted && !callEnded ? 6 : 12} align="center">
          <Typography variant="h6" gutterBottom>{name || 'Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay style={{ width: '500px' }} />
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={6} align="center">
          <Typography variant="h6" gutterBottom>{call.name || 'Name'}</Typography>
          <video playsInline ref={userVideo} autoPlay style={{ width: '500px' }} />
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
