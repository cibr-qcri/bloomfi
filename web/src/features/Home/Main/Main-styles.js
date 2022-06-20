import { css } from '@emotion/react';
import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      display: flex;
      flex-direction: column;
      min-height: 100%;
      text-align: center;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    `,
    title: css`
      margin-top: ${theme.spacing(2)};
    `,
    subtitle: css`
      margin-top: ${theme.spacing(1)};
      color: ${theme.palette.text.secondary};
    `,
    button: css`
      margin-top: ${theme.spacing(2)};
      padding: ${theme.spacing(1)};
      min-width: 120px;
    `,
  };
};

export default useStyles;
