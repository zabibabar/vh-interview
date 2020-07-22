import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import muiTheme from './theme';
import FilmList from './components/FilmList';
import CharacterList from './components/CharacterList';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0, 'auto', 1, 'auto'),
    flex: '1 0 auto',
  },
  logo: {
    width: 128,
    display: 'block',
    margin: theme.spacing(0, 'auto'),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function App() {
  const myTheme = createMuiTheme(muiTheme);
  const classes = useStyles();
  const [films, setFilms] = useState({ list: [], isFetching: false });
  const [selectedFilm, setSelectedFilm] = useState({});

  useEffect(() => {
    async function fetchFilms() {
      try {
        setFilms({ list: films.list, isFetching: true });
        const response = await axios.get('https://swapi.dev/api/films/');
        setFilms({ list: response.data.results, isFetching: false });
      } catch (e) {
        setFilms({ list: films.list, isFetching: false });
      }
    }
    fetchFilms();
  }, []);

  const handleFilmSelect = (title = '') => {
    let filmToSelect = {};
    if (title !== '') {
      filmToSelect = films.list.find((film) => film.title === title);
    }
    setSelectedFilm(filmToSelect);
  };
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Container>
        <img
          src={`${process.env.PUBLIC_URL}/starwars.png`}
          className={classes.logo}
          alt="star wars logo"
        />
        <Backdrop className={classes.backdrop} open={films.isFetching}>
          <CircularProgress />
        </Backdrop>
        {Object.keys(selectedFilm).length === 0 &&
        selectedFilm.constructor === Object ? (
          <FilmList films={films.list} handleFilmSelect={handleFilmSelect} />
        ) : (
          <>
            <Box display="flex" flexWrap="wrap">
              <Typography
                color="textPrimary"
                variant="h4"
                component="h1"
                className={classes.title}
              >
                {`${selectedFilm.title} (${
                  selectedFilm.release_date.split('-')[0]
                })`}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleFilmSelect()}
                color="primary"
                endIcon={<ArrowBackIosIcon />}
                className={classes.button}
              >
                Back
              </Button>
            </Box>
            <CharacterList charactersURL={selectedFilm.characters} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
