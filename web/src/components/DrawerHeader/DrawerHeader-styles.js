import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

const useStyles = () => {
  const theme = useTheme();

  return {
    div: css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: ${theme.spacing(0, 2)};
      min-height: 56px;
    `,
  };
};

export default useStyles;
