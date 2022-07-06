import { css } from '@emotion/react';
import { useTheme } from '@mui/system';

const useStyles = () => {
  const theme = useTheme();

  return {
    typography: css`
      padding: 24px;
      margin-top: ${theme.spacing(1)};
      text-align: center;
      align-items: center;
      justify-content: center;
    `,
    root: css`
      width: 50%;
      max-width: 460px;
      position: absolute;
      top: 30%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
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
      width: 50%;
    `,
    Update: css`
      margin: ${theme.spacing(1)};
      padding: ${theme.spacing(1)};
    `,
    div: css`
      display: flex;
      justify-content: center;
    `,
  };
};

export default useStyles;
