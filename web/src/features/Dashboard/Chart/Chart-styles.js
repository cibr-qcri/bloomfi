import { css } from '@emotion/react';

const useStyles = () => {
  return {
    Card: css`
      margin: 20px;
      padding: 1;
      border-radius: 16px;
    `,
    OverviewGrid: css`
      display: flex;
      justify-content: flex-end;
      padding: 20px;
    `,
    Button: css`
      font-size: small;
    `,
    ArrowRightIcon: css`
      font-size: small;
    `,
  };
};

export default useStyles;
