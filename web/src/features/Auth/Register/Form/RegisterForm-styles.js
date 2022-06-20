import { css } from '@emotion/react';

import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css`
      width: 100%;
      max-width: 460px;
    `,
    paper: css`
      padding: ${theme.spacing(1)};
      display: flex;
      flex-direction: column;
    `,
    text: css`
      margin: ${theme.spacing(1)};
    `,
    button: css`
      margin: ${theme.spacing(1)};
      padding: ${theme.spacing(1)};
    `,
  };
};

export default useStyles;
