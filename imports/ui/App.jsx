import React, { Fragment } from 'react';
import { Main } from './Main.jsx';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  box: {
    backgroundSize: 'cover',
    background: 'radial-gradient(circle, rgba(0,0,0,0.3029586834733894) 0%, rgba(0,0,0,0.6979166666666667) 50%), url(https://www.luc.edu/media/lucedu/math/images/newsfeaturesandstories/2015/chalk-board-with-math.jpg)',
    marginBottom: '25px'
  },
  text: {
    color: '#fff'
  }
}));

export const App = () => {
  const classes = useStyles();
  return (
    <Fragment>
        <Box p={10} boxShadow={3} className={classes.box}>
          <Typography variant="h1" component="h2" align="center" className={classes.text}>
            Random Fact Generator
          </Typography>
        </Box>
      <Container>
        <Main/>
      </Container>
    </Fragment>
  )
};