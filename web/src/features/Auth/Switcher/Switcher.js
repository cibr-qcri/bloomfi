/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';

import { Link, Paper, Typography } from '@mui/material';

import useStyles from './Switcher-styles';

const Switcher = (props) => {
  const styles = useStyles();
  const { onClick, question, path, action, containerStyle = styles.root } = props;

  const handleActionClicked = (event) => {
    event.preventDefault();
    onClick();
  };

  // JSX
  let link = null;
  if (path) {
    link = (
      <Link component={NavLink} to={path} underline="none">
        {action}
      </Link>
    );
  } else {
    link = (
      <Link href="#" onClick={handleActionClicked} underline="none">
        {action}
      </Link>
    );
  }

  const view = (
    <div css={containerStyle}>
      <Paper css={styles.paper} variant="outlined">
        <Typography align="center" css={styles.typography}>
          {question}? {link}.
        </Typography>
      </Paper>
    </div>
  );

  return view;
};

export default Switcher;
