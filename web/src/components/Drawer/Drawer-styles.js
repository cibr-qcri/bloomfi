import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

const useStyles = () => {
  const theme = useTheme();
  const drawerWidth = 240;

  return {
    openedMixin: css`
      width: ${drawerWidth};
      transition: ${theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })};
      overflow-x: hidden;
    `,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },

    Drawer: css``,
  };
};

export default useStyles;
