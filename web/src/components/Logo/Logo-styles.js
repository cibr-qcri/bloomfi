import { css } from '@emotion/react';

import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      margin: ${theme.spacing(2)};
    `,
    link: css`
      '&:hover': {
        text-decoration: none;
      }
    `,
    logo: css`
      font-family: ubuntu;
      line-height: 1px;
      font-size: 30px;
    `,
  };
};

export default useStyles;
