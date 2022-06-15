import { css } from '@emotion/react';

import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    `,
    loadingLabel: css`
      margin-top: ${theme.spacing(2)};
    `,
  };
};

export default useStyles;
