import React, { useState, useEffect } from 'react';
import { Actions } from './Actions.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { FactsCollection } from '../api/facts';
import Axios from 'axios';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  fav: {
    marginBottom: '-5px',
    fill: '#f00'
  },
  center: {
    textAlign: 'center'
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  delete: {
    fill: '#ccc',
    marginBottom: '-4px'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const NUMBERS_API_URL = (kind) => `http://numbersapi.com/random/${kind}`;
const FACT_TYPES = ['math', 'date', 'year', 'trivia'];

export const Main = () => {
  const classes = useStyles();

  const facts = useTracker(() => {
    return FactsCollection.find().fetch();
  });

  const [randomFact, setRandomFact] = useState('');
  const [favoriteFacts, setFavoriteFacts] = useState(facts);
  const [isFavorite, setIsFavorite] = useState(false);

  const getRandomFact = (kind) => {
    return () => {
      Axios.get(NUMBERS_API_URL(kind)).then(({ data }) => {
        setRandomFact(`${kind.toUpperCase()}: ${data}`);
        setIsFavorite(false);
      }).catch(error => console.error(error));
    }
  }

  const favoriteFact = () => {
    setIsFavorite(true);

    Meteor.call('insertFavoriteFact', randomFact, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        let _id = result;
        let fact = randomFact;

        console.log('client result', {_id, fact});
        setFavoriteFacts(favoriteFacts => [...favoriteFacts, {_id, fact}]);
      }
    })
  }

  const removeFavorite = (id) => {
    Meteor.call('removeFavoriteFact', id, (error) => {
      if (error) {
        console.error(error);
      } else {
        setIsFavorite(false);
        setFavoriteFacts(favoriteFacts.filter(fact => fact._id !== id));
      }
    })
  }

  useEffect(() => {
    let random = Math.floor(Math.random() * 4);
    let randomType = FACT_TYPES[random];
    let loadInitialFact = getRandomFact(randomType);
    
    loadInitialFact();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              gutterBottom
              className={classes.center}
            >
              {randomFact} <br />
              {isFavorite ?
                (<Favorite className={classes.fav} />) :
                (<FavoriteBorder
                  className={classes.fav}
                  onClick={favoriteFact}
                />)
              }
            </Typography>
          </Paper>
        </Grid>

        <Actions buttons={FACT_TYPES} click={getRandomFact}/>
        
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom align="center">
            My Favorite Facts
          </Typography>
          {favoriteFacts.length > 0 ? (
            <List dense={false}>
              {favoriteFacts.map(fact => (
                <ListItem key={fact._id}>
                  <ListItemText primary={fact.fact}/>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => removeFavorite(fact._id)}>
                      <Delete className={classes.delete} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <p className={classes.center}>You don't have any favorite facts yet.</p>
          )}
        </Grid>

      </Grid>
    </div>
  );
};