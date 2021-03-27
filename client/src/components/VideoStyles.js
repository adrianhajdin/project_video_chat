import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  video: {
    width: '550px',
    margin: '20px 20px',
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
}));

