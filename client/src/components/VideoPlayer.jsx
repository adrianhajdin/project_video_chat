import React, { useRef, useState, useEffect, useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const [score, setScore] = useState(50);
  const canvasRef = useRef(null);
  const [scr, setScr] = useState();
  const classes = useStyles();

  const uploada = (scrFile) => {
    axios({
      method: 'post',
      url: 'http://localhost:80/api/emotion/',
      data: {
        scr: scrFile,
      },
    }).then((res) => {
      console.log(res.data.score);
      setScore(score + res.data.score);
    }).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    if (scr === null || scr === undefined) {
      console.log('hello');
      return;
    }
    console.log('Screenshot Changed');
    uploada(scr);
  }, [scr]);

  const captureScreenshot = () => {
    if (document.getElementById('od') == null) {
      return;
    }
    const video = userVideo.current;
    const canvas = canvasRef.current;

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save the screenshot (you can modify this part to store the images as needed)
    const screenshot = canvas.toDataURL('image/png');
    setScr(screenshot);
  };

  useEffect(() => {
    let timerId = setInterval(captureScreenshot, 2000);

    console.log(document.getElementById('time'));
    document.getElementById('time').addEventListener('loadmetadata', () => {
      timerId = setInterval(captureScreenshot, 2000);
    });

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const time = 'time';
  const id = 'od';
  return (
    <Grid id={time} container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'} Score is {score}</Typography>
            <video id={id} playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Grid>
  );
};

export default VideoPlayer;
