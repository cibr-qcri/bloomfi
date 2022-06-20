/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { Container } from '@mui/material';

import Footer from './Footer';
import Header from '../../components/Header';
import Main from './Main';

import useStyles from './Home-styles';

export const Home = () => {
  const styles = useStyles();

  return (
    <Container maxWidth="lg" disableGutters css={styles.container}>
      <Header />
      <div css={styles.subContainer}>
        <Main />
      </div>
      <Footer />
    </Container>
  );
};

export default Home;
