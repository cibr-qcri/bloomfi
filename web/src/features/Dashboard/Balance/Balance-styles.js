import { css } from '@emotion/react';

const useStyles = () => {
  return {
    GridContainer: css`
      align-items: center;
      justify-content: space-between;
      margin-right: 20px;
      margin-left: 30px;
    `,
    GridItem: css`
      margin-right: 10px;
      margin-left: 10px;
    `,
    DepositButton: css`
      margin-right: 20px;
    `,
    WithdrawButton: css`
      margin-right: 50px;
    `,
  };
};

export default useStyles;
