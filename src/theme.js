export default {
  palette: {
    type: 'dark',
    primary: {
      main: '#f3c20f',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: `url(${process.env.PUBLIC_URL}/star-bg.jpg) no-repeat center center fixed`,
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background-size': 'cover',
          'background-size': 'cover',
        },
      },
    },
  },
};
