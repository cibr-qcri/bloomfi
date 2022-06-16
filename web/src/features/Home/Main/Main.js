/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { Button, Container, Typography } from '@mui/material';

import useStyles from './Main-styles';

export const Main = () => {
  const styles = useStyles();

  const view = (
    <Container maxWidth="xl" css={styles.container}>
      <Typography variant="h4" css={styles.title}>
        The best way to invest in DeFi
      </Typography>
      <Typography css={styles.subtitle}>
        Easy, automated, &amp; personalized DeFi investing for everyone
      </Typography>
      <Button variant="contained" disableElevation disableRipple css={styles.button}>
        Get Started
      </Button>
    </Container>
  );

  return view;
};

export default Main;
