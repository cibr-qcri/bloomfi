import { css } from '@emotion/react';
import THEME from '../../../constants/theme';

const useStyles = () => {
  return {
    Card: css`
      margin: 20px;
      padding: 20px;
      border-radius: 16px;
      background-color: ${THEME.palettes.dark.mode};
    `,
    GridContainer: css`
      justify-content: space-between;
      align-items: center;
      spacing: 1;
    `,
    GridItem: css`
      margin: 2px;
    `,
    Typography: css`
      text-color: text.primary;
    `,
  };
};

export default useStyles;
