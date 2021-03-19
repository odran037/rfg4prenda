import React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export const Actions = ({buttons, click}) => {
  return (
    <ThemeProvider theme={theme}>
      {buttons.map((btn, index) => {
        let label = btn.charAt(0).toUpperCase() + btn.substr(1)
        return (
          <Grid key={index} item xs={3}>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={click(btn)}
            >
              {label}
            </Button>
          </Grid>
        );
      })}
    </ThemeProvider>
  )
};