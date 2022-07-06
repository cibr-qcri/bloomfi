import { css } from '@emotion/react';
import THEME from '../../../constants/theme';
import * as React from 'react';

const useStyles = () => {
  return {
    IconButton: css`
      margin-right: 20px;
    `,
    Grid: css`
      justify-content: space-between;
      align-items: center;
    `,
    AvatarLink: css`
      text-decoration: none;
    `,
    Avatar: css`
      background-color: ${THEME.palettes.dark.primary.main};
    `,
    ListItem: css`
      display: 'block';
    `,
    ListItemButton: css`
      min-height: 5px;
      justify-content: ${open ? 'initial' : 'center'};
      margin-top: 10px;
    `,
    ListItemIcon: css`
      min-width: 0;
      justify-content: 'center';
      margin-right: ${open ? '30px' : 'auto'};
    `,
    ListItemText: css`
      opacity: ${open ? 1 : 0};
    `,
  };
};

export default useStyles;
