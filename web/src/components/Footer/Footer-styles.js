import { css } from '@emotion/react';
import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      text-align: center;
      margin-top: ${theme.spacing(2)};
      margin-bottom: ${theme.spacing(0.75)};
    `,
  };
};

export default useStyles;
