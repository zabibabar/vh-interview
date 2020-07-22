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
    },
  },
}));

export default function Character({ name }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h2" align="center">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

Character.propTypes = {
  name: PropTypes.string.isRequired,
};
