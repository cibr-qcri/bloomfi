import { css } from '@emotion/react';

import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css`
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: ${theme.spacing(4)};
    `,
    text: css`
      margin: ${theme.spacing(2)};
    `,
    switcherContainer: css`
      width: 460px;
      margin-top: ${theme.spacing(2)};
    `,
  };
};

export default useStyles;
