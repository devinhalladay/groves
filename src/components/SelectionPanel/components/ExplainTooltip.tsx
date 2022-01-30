import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import React from 'react';

const ExplainTooltip = () => {
  return (
    <Tooltip2
      content="Add tags to connect blocks to an are.na channel! Creating a tag creates a new channel."
      targetProps={{
        width: 16,
        height: 16
      }}
      usePortal={false}>
      <div
        style={{
          width: 16,
          height: 16,
          marginTop: 5,
          marginRight: 5
        }}>
        <Icon icon="info-sign" />
      </div>
    </Tooltip2>
  );
};

export default ExplainTooltip;
