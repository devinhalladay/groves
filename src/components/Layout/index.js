import Slider from 'rc-slider';
import React, { useRef, useState } from 'react';
import { PanZoom } from 'react-easy-panzoom';
import SelectionPanel from '~/src/components/SelectionPanel';
import { useSelection } from '@context/selection-context';
import { useWorkspace } from '@context/workspace-context';

const Layout = (props) => {
  return props.children;
};

export const Container = (props) => {
  return props.children;
};

export default Layout;
