import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import PropTypes from 'prop-types';

import Character from './Character';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function CharacterList({ charactersURL = [] }) {
  const classes = useStyles();
  const [characters, setCharacters] = useState({ list: [], isFetching: false });

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setCharacters({ list: [], isFetching: true });
        const URLs = charactersURL.map((URL) =>
          axios.get(URL.replace('http', 'https'))
        );
        const response = await axios.all(URLs);
        setCharacters({ list: response, isFetching: false });
      } catch (e) {
        setCharacters({ list: [], isFetching: false });
      }
    }
    fetchCharacters();
  }, [charactersURL]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={characters.isFetching}>
        <CircularProgress />
      </Backdrop>
      <Grid container spacing={3}>
        {characters.list.map((character) => (
          <Grid item key={character.data.url} xs={12} sm={6} md={4} lg={3}>
            <Character name={character.data.name} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

CharacterList.propTypes = {
  charactersURL: PropTypes.arrayOf(PropTypes.string).isRequired,
};
