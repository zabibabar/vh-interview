import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Film from './Film';

export default function FilmList({ films, handleFilmSelect }) {
  return (
    <Grid container spacing={3} justify="center">
      {films.map((film) => (
        <Grid item key={film.episode_id} xs={12} sm={6} md={4} lg={3}>
          <Film
            title={film.title}
            releaseYear={film.release_date.split('-')[0]}
            handleFilmSelect={handleFilmSelect}
          />
        </Grid>
      ))}
    </Grid>
  );
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleFilmSelect: PropTypes.func.isRequired,
};
