import React from 'react';
import { Typography, CssBaseline } from '@material-ui/core';
import { Notifications, Sidebar, VideoPlayer } from './components';

const App = () => (
  <>
    <CssBaseline />
    <Typography variant="h2" align="center" style={{ margin: '20px 0' }}>Video Chat</Typography>
    <VideoPlayer />
    <Sidebar />
    <Notifications />
  </>
);

export default App;
