import React from 'react';
import { Main } from './Main.jsx';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export const App = () => (
  <Container>
    <Typography variant="h1" component="h2" gutterBottom align="center">
      Random Fact Generator
    </Typography>
    <Main/>
  </Container>
);