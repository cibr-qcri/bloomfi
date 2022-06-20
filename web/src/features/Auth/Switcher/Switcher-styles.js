import { css } from '@emotion/react';

import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css`
      width: 100%;
    `,
    paper: css`
      padding: ${theme.spacing(2)};
    `,
    text: css`
      padding: ${theme.spacing(1)};
    `,
  };
};

export default useStyles;
