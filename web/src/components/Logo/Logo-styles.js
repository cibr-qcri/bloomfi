import { css } from '@emotion/react';

import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `,
    link: css`
      '&:hover': {
        text-decoration: none;
      }
    `,
    image: css`
      height: 60px;
    `,
    text: css`
      line-height: 1px;
      font-size: 60px;
      margin-left: ${theme.spacing(2)};
    `,
  };
};

export default useStyles;
