/** @jsxImportSource @emotion/react */

import React from 'react';

import { Divider, Drawer } from '@mui/material';

import General from './General';
import Settings from './Settings';

const HeaderMenu = (props) => {
  const { open, onClose, isAuth } = props;

  const view = (
    <Drawer anchor="left" open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
      <General onClose={onClose} />
      <Divider />
      <Settings onClose={onClose} isAuth={isAuth} />
    </Drawer>
  );

  return view;
};

export default HeaderMenu;
