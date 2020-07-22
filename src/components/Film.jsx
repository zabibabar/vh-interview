import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'none',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
}));
export default function Film({ title, releaseYear, handleFilmSelect }) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={() => handleFilmSelect(title)}
    >
      <CardContent>
        <Typography variant="h6" component="h2" align="center">
          {title}
        </Typography>
        <Typography variant="subtitle1" component="p" align="center">
          {releaseYear}
        </Typography>
      </CardContent>
    </Card>
  );
}

Film.propTypes = {
  title: PropTypes.string.isRequired,
  releaseYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleFilmSelect: PropTypes.func.isRequired,
};
