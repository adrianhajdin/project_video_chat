import React from 'react';
import { Typography, CssBaseline } from '@material-ui/core';
import { Notifications, Sidebar, VideoPlayer } from './components';

const App = () => (
  <>
    <CssBaseline />
    <Typography variant="h2" align="center">Video Chat</Typography>
    <VideoPlayer />
    <Sidebar />
    <Notifications />
  </>
);

export default App;
