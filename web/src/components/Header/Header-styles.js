import { css } from '@emotion/react';
import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: ${theme.spacing(2)}};
    `,
    toolbar: css`
      position: absolute;
      left: 0;
    `,
    link: css`
      text-decoration: none;
    `,
    logo: css`
      font-size: 26px;
    `,
  };
};

export default useStyles;
