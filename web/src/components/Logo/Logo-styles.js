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
      height: 32px;
    `,
    text: css`
      color: ${theme.palette.text.primary};
      font-size: 32px;
      margin-left: ${theme.spacing(1.5)};
    `,
  };
};

export default useStyles;
